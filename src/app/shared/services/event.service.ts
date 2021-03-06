import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Event } from '../models/event.model';
import { Company } from '../models/company.model';
import { CONTEXT_PATH } from '../app.constants';

@Injectable()
export class EventService {

  static options(): RequestOptions {
    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers, withCredentials: true});
  }

  constructor(private http: Http) {
  }

  getEvent(eventId: number): Observable<Event> {
    return this.http.get(CONTEXT_PATH + '/events/' + eventId, EventService.options())
      .map(response => <Event>response.json())
      .catch(this.handleError);
  }

  getAllEvents(): Observable<Event[]> {
    return this.http.get(CONTEXT_PATH + '/events', EventService.options())
      .map(response => <Event[]>response.json())
      .catch(this.handleError);
  }

  createEvent(event: Event): Observable<Response> {
    return this.http.post(CONTEXT_PATH + '/events', event, EventService.options())
      .catch(this.handleError);
  }

  updateEvent(eventId: number, event: Event): Observable<Response> {
    return this.http.put(CONTEXT_PATH + '/events/' + eventId, event, EventService.options())
      .catch(this.handleError);
  }

  getUnassignedCompaniesForEvent(eventId: number): Observable<Company[]> {
    return this.http.get(CONTEXT_PATH + '/events/' + eventId + '/tasks/assign', EventService.options())
      .map(response => <Company[]>response.json())
      .catch(this.handleError);
  }

  handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.statusMessage || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = 'Error while loading data.';
    }

    return Observable.throw({status: error.status, message: errMsg});
  }

}
