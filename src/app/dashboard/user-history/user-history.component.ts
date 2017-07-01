import { Component, Input, OnInit } from '@angular/core';
import { TaskStatistics } from '../../shared/models/task-statistics.model';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthorizationService } from '../../shared/services/authorization.service';

@Component({
  selector: 'app-user-history',
  templateUrl: './user-history.component.html',
  styleUrls: ['./user-history.component.css']
})
export class UserHistoryComponent implements OnInit {

  @Input() stats: TaskStatistics;

  id: number;
  notes: string;

  constructor(
    private userService: UserService,
    private notificationService: NotificationService,
    private authService: AuthorizationService) { }

  ngOnInit() {
    this.id = this.authService.getCurrentUser().id;

    this.userService.getUserNotes(this.id)
      .subscribe(notes => {
        this.notes = notes;
      },
      error => this.notificationService.notify('Cannot fetch user notes', error, 'error'));
  }

}
