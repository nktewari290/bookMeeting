// src/app/room-status/room-status.component.ts
import { Component } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../model/meeting.model';

@Component({
  selector: 'app-room-status',
  templateUrl: './room-status.component.html',
  styleUrls: ['./room-status.component.css'],
})
export class RoomStatusComponent {
  date: string = '';
  fromTime: string = '';
  toTime: string = '';
  statuses: { room: number; status: string; meeting?: Meeting }[] = [];

  constructor(private meetingService: MeetingService) {}

  checkStatus(): void {
    this.statuses = [];
    this.meetingService.getMeetings().subscribe((meetings) => {
      for (let room = 1; room <= 10; room++) {
        const roomMeetings = meetings.filter(m => m.room === room && m.date === this.date);
        const overlappingMeeting = roomMeetings.find(m => 
          this.isOverlapping(m.fromTime, m.toTime, this.fromTime, this.toTime)
        );
        if (overlappingMeeting) {
          this.statuses.push({ room, status: 'In-Use', meeting: overlappingMeeting });
        } else {
          this.statuses.push({ room, status: 'Available' });
        }
      }
    });
  }

  isOverlapping(fromTime1: string, toTime1: string, fromTime2: string, toTime2: string): boolean {
    const from1 = this.getTimeInMinutes(fromTime1);
    const to1 = this.getTimeInMinutes(toTime1);
    const from2 = this.getTimeInMinutes(fromTime2);
    const to2 = this.getTimeInMinutes(toTime2);

    return (from1 < to2 && to1 > from2);
  }

  getTimeInMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }
}