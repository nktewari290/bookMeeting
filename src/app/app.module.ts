// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BookingComponent } from './booking/booking.component';
import { ViewMeetingsComponent } from './view-meetings/view-meetings.component';
import { DeleteMeetingComponent } from './delete-meeting/delete-meeting.component';
import { RoomStatusComponent } from './room-status/room-status.component';
import { MeetingService } from './meeting.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    BookingComponent,
    ViewMeetingsComponent,
    DeleteMeetingComponent,
    RoomStatusComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [MeetingService],
  bootstrap: [AppComponent]
})
export class AppModule { }