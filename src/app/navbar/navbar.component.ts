import { Component, OnInit } from '@angular/core';
import {AuthorizationService} from '../shared/services/authorization.service';
import {User} from '../shared/models/user.model';
import {Router} from "@angular/router";
import {NotificationService} from "../shared/services/notification.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthorizationService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      this.user = this.authService.getCurrentUser();
    }

    this.authService.userStateChanged
      .subscribe(
        (user: User) => this.user = user
      );
  }

  onLogout() {
    this.authService.logout();
  }

}
