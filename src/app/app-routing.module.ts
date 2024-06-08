// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingComponent } from './booking/booking.component';
import { ViewMeetingsComponent } from './view-meetings/view-meetings.component';
import { DeleteMeetingComponent } from './delete-meeting/delete-meeting.component';
import { RoomStatusComponent } from './room-status/room-status.component';

const routes: Routes = [
  { path: 'book', component: BookingComponent },
  { path: 'view', component: ViewMeetingsComponent },
  { path: 'delete', component: DeleteMeetingComponent },
  { path: 'status', component: RoomStatusComponent },
  { path: '', redirectTo: '/book', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }