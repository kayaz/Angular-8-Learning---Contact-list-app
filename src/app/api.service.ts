import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Contact } from './contact';
import { Calendar } from './calendar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PHP_API_SERVER = 'http://localhost/ngdb';
  constructor(private httpClient: HttpClient) {}

  readContact(): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.PHP_API_SERVER}/read.php`);
  }

  editContact(id: number): Observable<Contact[]> {
    return this.httpClient.get<Contact[]>(`${this.PHP_API_SERVER}/show.php/?id=${id}`);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.httpClient.post<Contact>(`${this.PHP_API_SERVER}/create.php`, contact);
  }

  updateContact(contact: Contact) {
    return this.httpClient.put<Contact>(`${this.PHP_API_SERVER}/update.php`, contact);
  }

  deleteContact(id: number) {
    return this.httpClient.delete<Contact>(`${this.PHP_API_SERVER}/delete.php/?id=${id}`);
  }

  createEvent(calendar: Calendar): Observable<Calendar> {
    return this.httpClient.post<Calendar>(`${this.PHP_API_SERVER}/calendar/create.php`, calendar);
  }

  readEvents(): Observable<Calendar[]> {
    return this.httpClient.get<Calendar[]>(`${this.PHP_API_SERVER}/calendar/read.php`);
  }

  editEvent(id: number): Observable<Calendar[]> {
    return this.httpClient.get<Calendar[]>(`${this.PHP_API_SERVER}/calendar/show.php/?id=${id}`);
  }

  deleteEvent(id: number) {
    return this.httpClient.delete<Contact>(`${this.PHP_API_SERVER}/calendar/delete.php/?id=${id}`);
  }

  updateEvent(calendar: Calendar) {
    return this.httpClient.put<Contact>(`${this.PHP_API_SERVER}/calendar/update.php`, calendar);
  }
}
