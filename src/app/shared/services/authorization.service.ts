import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
import { NotificationService } from './notification.service';
import { Router } from '@angular/router';
import { CONTEXT_PATH } from '../app.constants';

@Injectable()
export class AuthorizationService {

  loggedUser: User;
  userStateChanged = new Subject<User>();

  constructor(
    private notificationService: NotificationService,
    private router: Router,
    private http: Http
  ) {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('loggedUser') != null;
  }

  getCurrentUser(): User {
    return <User>JSON.parse(localStorage.getItem('loggedUser'));
  }

  login(email: string, password: string): Observable<User> {
    const headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = new RequestOptions({headers: headers, withCredentials: true});

    const credentials = 'username=' + email + '&password=' + password;

    return this.http.post(CONTEXT_PATH + '/login',
      credentials,
      options)
      .map(this.extractData)
      .catch(this.handleError);
  }

  logout() {
    return this.http.get(CONTEXT_PATH + '/logout')
      .subscribe(
        response => {
          if (response.status === 200) {
            localStorage.removeItem('loggedUser');
            this.loggedUser = null;
            this.userStateChanged.next(null);
            this.notificationService.notify('Authorization message', 'You successfully logged out', 'info');
            this.router.navigate(['/login']);
          } else {
            this.notificationService.notify('Authorization message', 'Something went wrong', 'error');
          }
        }
      );
  }

  private extractData(res: Response): User {
    const body = res.json();

    localStorage.setItem('loggedUser', JSON.stringify(body));
    const loggedUser: User = <User>body;
    this.loggedUser = loggedUser;

    return loggedUser;
  }

  private handleError(error: Response | any) {
    // TODO In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    console.log('Error: ' + error)
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.statusMessage || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = 'An error occured while trying to login.';
    }

    return Observable.throw(errMsg);
  }

}
