import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/services/task.service';
import { AuthorizationService } from '../shared/services/authorization.service';
import { Task } from '../shared/models/task.model';
import { NotificationService } from '../shared/services/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  id: number;
  tasks: Task[];

  // filtering data
  eventId: number;
  companyId: number;
  userId: number;
  type: string;
  status: string;
  // end filtering data

  // spinner loading
  loading: boolean;

  constructor(private taskService: TaskService,
              private authService: AuthorizationService,
              private notificationService: NotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.loading = true;

    this.tasks = [];
    this.id = this.authService.getCurrentUser().id;

    this.taskService.getAllTasksOfUser(this.id)
      .subscribe(
        tasks => {
          this.tasks = tasks;
          this.loading = false;
        },
        error => {
          if (error.status === 401) {
            this.authService.logout();
          } else {
            this.notificationService.notify('Error', error, 'error');
          }
        }
      );

    this.route.queryParams
      .subscribe(
        queryParams => {
          this.loading = true;

          if (queryParams['eventId']) {
            this.eventId = +queryParams['eventId'];
          } else {
            this.eventId = null;
          }

          if (queryParams['companyId']) {
            this.companyId = +queryParams['companyId'];
          } else {
            this.companyId = null;
          }
          if (queryParams['userId']) {
            this.userId = +queryParams['userId'];
          } else {
            this.userId = null;
          }
          this.type = queryParams['type'];
          this.status = queryParams['status'];

          this.taskService.filterTasks(this.eventId, this.companyId, this.userId, this.type, this.status)
            .subscribe(
              tasks => {
                this.tasks = tasks;
                this.loading = false;
              },
              error => {
                this.notificationService.notify('Cannot load filtered tasks', error, 'error');
              }
            );
        }
      );
  }

}
