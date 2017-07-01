import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[];

  loading: boolean;

  constructor(private userService: UserService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.loading = true;

    this.userService.getAllUsers()
      .subscribe(
        users => {
          this.users = users;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.notificationService.notify('Cannot fetch all users', error, 'error');
        });
  }

}
