// src/app/booking/booking.component.ts
import { Component } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../model/meeting.model';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent {
  meeting: Meeting = {
    username: '',
    room: 1,
    date: '',
    fromTime: '',
    toTime: '',
    agenda: '',
  };

  constructor(private meetingService: MeetingService) { }

  bookMeeting(): void {
    if (this.validateMeetingTime()) {
      this.meetingService.getMeetingsForRoomAndDate(this.meeting.room, this.meeting.date).subscribe(
        (existingMeetings: any) => {
          if (this.isTimeSlotAvailable(existingMeetings)) {
            this.meetingService.bookMeeting(this.meeting).subscribe(() => {
              this.resetValues();
              alert('Meeting booked successfully');
            });
          } else {
            alert('The selected time slot is already booked for this room.');
          }
        });
    }
  }

  validateMeetingTime(): boolean {
    const date = new Date(this.meeting.date);
    const day = date.getDay();
    if (day === 0 || day === 6) {
      alert('Meetings can only be scheduled from Monday to Friday.');
      return false;
    }

    const fromTime = this.getTimeInMinutes(this.meeting.fromTime);
    const toTime = this.getTimeInMinutes(this.meeting.toTime);
    const startOfWorkDay = this.getTimeInMinutes('09:00');
    const endOfWorkDay = this.getTimeInMinutes('18:00');

    if (fromTime < startOfWorkDay || toTime > endOfWorkDay) {
      alert('Meetings can only be scheduled between 9:00 AM and 6:00 PM.');
      return false;
    }

    if (toTime - fromTime < 30) {
      alert('The duration for the meetings should be at least 30 minutes.');
      return false;
    }

    return true;
  }

  isTimeSlotAvailable(existingMeetings: Meeting[]): boolean {
    const newFromTime = this.getTimeInMinutes(this.meeting.fromTime);
    const newToTime = this.getTimeInMinutes(this.meeting.toTime);

    for (const meeting of existingMeetings) {
      const existingFromTime = this.getTimeInMinutes(meeting.fromTime);
      const existingToTime = this.getTimeInMinutes(meeting.toTime);

      if ((newFromTime >= existingFromTime && newFromTime < existingToTime) ||
        (newToTime > existingFromTime && newToTime <= existingToTime) ||
        (newFromTime <= existingFromTime && newToTime >= existingToTime)) {
        return false;
      }
    }

    return true;
  }

  getTimeInMinutes(time: string): number {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  }

  resetValues() {
    this.meeting = {
      username: '',
      room: 1,
      date: '',
      fromTime: '',
      toTime: '',
      agenda: '',
    };
  }
}
