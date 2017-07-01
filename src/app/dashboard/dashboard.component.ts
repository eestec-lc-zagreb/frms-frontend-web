import { Component, OnInit } from '@angular/core';
import { AuthorizationService } from '../shared/services/authorization.service';
import { User } from '../shared/models/user.model';
import { TaskService } from '../shared/services/task.service';
import { TaskStatistics } from '../shared/models/task-statistics.model';
import { NotificationService } from '../shared/services/notification.service';
import { Task } from '../shared/models/task.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  user: User;
  statistics: TaskStatistics;
  tasks: Task[];

  statisticsLoading: boolean;
  activeTasksLoading: boolean;

  constructor(private authService: AuthorizationService,
              private taskService: TaskService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.statisticsLoading = true;
    this.activeTasksLoading = true;

    this.user = new User();
    this.statistics = new TaskStatistics();
    this.tasks = [];
    this.user = this.authService.getCurrentUser();

    this.taskService.getStatisticsForUser(this.user.id)
      .subscribe(
        (stat: TaskStatistics) => {
          this.statisticsLoading = false;
          this.statistics = stat;
        },
        error => {
          this.statisticsLoading = false;
          if (error.status === 401) {
            this.authService.logout();
          } else {
            this.notificationService.notify('Cannot fetch statistics for user', error, 'error');
          }
        }
      );

    this.taskService.getActiveTasksOfUser(this.user.id)
      .subscribe(
        (tasks: Task[]) => {
          this.tasks = tasks;
          this.activeTasksLoading = false;
        },
        error => {
          this.activeTasksLoading = false;
          if (error.status === 401) {
            this.authService.logout();
          } else {
            this.notificationService.notify('Cannot fetch active tasks of user', error, 'error');
          }
        }
      );
  }

}
