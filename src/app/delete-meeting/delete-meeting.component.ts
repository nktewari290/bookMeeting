// src/app/delete-meeting/delete-meeting.component.ts
import { Component } from '@angular/core';
import { Meeting } from '../model/meeting.model';
import { MeetingService } from '../meeting.service';
import { SharedMethodsService } from '../sharedMethods.service';

@Component({
  selector: 'app-delete-meeting',
  templateUrl: './delete-meeting.component.html',
  styleUrls: ['./delete-meeting.component.css'],
})
export class DeleteMeetingComponent {

  constructor(private meetingService: MeetingService,
    public sharedMethodService: SharedMethodsService) {
    this.sharedMethodService.loadMeetings();
  }
}
