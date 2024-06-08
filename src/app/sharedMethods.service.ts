import { Injectable } from "@angular/core";
import { MeetingService } from "./meeting.service";
import { Meeting } from "./model/meeting.model";

@Injectable(
    {providedIn:'root'}
)
export class SharedMethodsService{

    meetings: Meeting[] | any = [];
  selectedMeeting: Meeting | any = null;
    constructor(private meetingService:MeetingService){}

    loadMeetings(): void {
        this.meetingService.getMeetings().subscribe((meetings) => {
          this.meetings = meetings;
        });
      }
    
      deleteMeeting(): void {
        if (this.selectedMeeting) {
          this.meetingService.deleteMeeting(this.selectedMeeting.id).subscribe(() => {
            this.loadMeetings();
            this.selectedMeeting = null;
          });
        }
      }
}