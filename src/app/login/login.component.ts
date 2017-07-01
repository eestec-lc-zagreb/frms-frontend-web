import { Component, OnInit } from '@angular/core';
import { UserDetails } from './user-details.model';
import { AuthorizationService } from '../shared/services/authorization.service';
import { User } from '../shared/models/user.model';
import { Router } from '@angular/router';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = new UserDetails();

  loading: boolean;

  constructor(
    private authService: AuthorizationService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.loading = false;
  }

  onSubmit() {
    this.loading = true;

    this.authService.login(this.model.email, this.model.password)
      .subscribe(
        (user: User) => {
          this.authService.userStateChanged.next(user);
          this.notificationService.notify('Authorization message', 'You are successfully logged in', 'success')
          this.router.navigate(['/dashboard']);
        },
        error => {
          console.log(error);
          this.loading = false;
          this.notificationService.notify('Authorization message', error, 'error');
        }
      );
  }

}
