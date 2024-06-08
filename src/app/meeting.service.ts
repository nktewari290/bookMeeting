// src/app/services/meeting.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meeting } from './model/meeting.model';

@Injectable({
  providedIn: 'root',
})
export class MeetingService {
  private apiUrl = 'http://localhost:3000/api/meetings';

  constructor(private http: HttpClient) { }

  bookMeeting(meeting: Meeting): Observable<Meeting> {
    return this.http.post<Meeting>(this.apiUrl, meeting);
  }

  getMeetingsForRoom(room: number): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}/room/${room}`);
  }

  getMeetings(): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(this.apiUrl);
  }

  deleteMeeting(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getMeetingsForRoomAndDate(room: number, date: string): Observable<Meeting[]> {
    return this.http.get<Meeting[]>(`${this.apiUrl}?room=${room}&date=${date}`);
  }
}