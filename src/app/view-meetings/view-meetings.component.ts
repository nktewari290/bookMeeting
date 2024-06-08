// src/app/view-meetings/view-meetings.component.ts
import { Component } from '@angular/core';
import { MeetingService } from '../meeting.service';
import { Meeting } from '../model/meeting.model';
import { SharedMethodsService } from '../sharedMethods.service';

@Component({
  selector: 'app-view-meetings',
  templateUrl: './view-meetings.component.html',
  styleUrls: ['./view-meetings.component.css'],
})
export class ViewMeetingsComponent {
  room: number = 1;

  constructor(private meetingService: MeetingService,
    public sharedMethodService: SharedMethodsService
  ) { }

  getMeetings(): void {
    this.meetingService.getMeetingsForRoom(this.room).subscribe(
      (meetings) => {
        this.sharedMethodService.meetings = meetings;
      }
    );
  }
}