import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/services/task.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Task } from '../../shared/models/task.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class AdminTaskListComponent implements OnInit {

  tasks: Task[];

  // filtering data
  eventId: number;
  companyId: number;
  userId: number;
  type: string;
  status: string;
  // end filtering data

  pageLoading: boolean;
  filterLoading: boolean;

  constructor(private taskService: TaskService,
              private notificationService: NotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.pageLoading = true;
    this.filterLoading = false;

    this.taskService.getAllTasks()
      .subscribe(
        tasks => {
          this.tasks = tasks;
          this.pageLoading = false;
        },
        error => {
          this.pageLoading = false;
          this.notificationService.notify('Cannot fetch all tasks', error, 'error');
        }
      );

    this.route.queryParams
      .subscribe(
        queryParams => {
          this.filterLoading = true;

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
                this.filterLoading = false;
              },
              error => {
                this.filterLoading = false;
                this.notificationService.notify('Cannot filter tasks', error, 'error');
              }
            );
        }
      );
  }


}
