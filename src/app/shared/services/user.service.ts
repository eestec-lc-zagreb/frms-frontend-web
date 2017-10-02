import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user.model';
import { CONTEXT_PATH } from '../app.constants';

@Injectable()
export class UserService {

  static options(): RequestOptions {
    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers, withCredentials: true});
  }

  constructor(private http: Http) {}

  getUserNotes(userId: number) {
    return this.http.get(CONTEXT_PATH + '/users/' + userId + '/notes', UserService.options())
      .map(res => <string>res.json())
      .catch(this.handleError);
  }

  updateUserNotes(userId: number, content: string) {
    const body = {notes: content};
    return this.http.put(CONTEXT_PATH + '/users/' + userId + '/notes', body, UserService.options())
      .catch(this.handleError);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get(CONTEXT_PATH + '/users', UserService.options())
      .map(response => <User[]>response.json())
      .catch(this.handleError);
  }

  getAllUsersByRole(role: string): Observable<User[]> {
    return this.http.get(CONTEXT_PATH + '/users?role=' + role, UserService.options())
      .map(response => <User[]>response.json())
      .catch(this.handleError);
  }

  getUser(userId: number): Observable<User> {
    return this.http.get(CONTEXT_PATH + '/users/' + userId, UserService.options())
      .map(response => <User>response.json())
      .catch(this.handleError);
  }

  createUser(user: User): Observable<Response> {
    return this.http.post(CONTEXT_PATH + '/users', user, UserService.options())
      .catch(this.handleError);
  }

  updateUser(userId: number, user: User): Observable<Response> {
    return this.http.put(CONTEXT_PATH + '/users/' + userId, user, UserService.options())
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
