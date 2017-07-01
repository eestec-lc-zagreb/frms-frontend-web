import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from '../shared/services/task.service';
import { Task } from '../shared/models/task.model';
import { AuthorizationService } from '../shared/services/authorization.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  id: number;
  task: Task;

  loading: boolean;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private authService: AuthorizationService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.loading = true;

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.taskService.getTask(this.id)
            .subscribe(
              task => {
                this.task = task;
                this.loading = false;
              },
              error => {
                if (error.status === 401) {
                  this.authService.logout();
                } else {
                  this.notificationService.notify('Cannot fetch task details', error, 'error');
                }
              }
            );
        }
      );
  }

}
