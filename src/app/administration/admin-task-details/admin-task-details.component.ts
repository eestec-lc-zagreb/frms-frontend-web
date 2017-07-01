import { Component, OnInit } from '@angular/core';
import { Task } from '../../shared/models/task.model';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from '../../shared/services/task.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-admin-task-details',
  templateUrl: './admin-task-details.component.html',
  styleUrls: ['./admin-task-details.component.css']
})
export class AdminTaskDetailsComponent implements OnInit {

  id: number;
  task: Task;

  loading: boolean;

  constructor(private route: ActivatedRoute,
              private taskService: TaskService,
              private notificationService: NotificationService) { }

  ngOnInit() {
    this.loading = false;

    this.route.params
      .subscribe(
        (params: Params) => {
          this.loading = true;

          this.id = +params['id'];
          this.taskService.getTask(this.id)
            .subscribe(
              task => {
                this.task = task;
                this.loading = false;
              },
              error => {
                this.loading = false;
                this.notificationService.notify('Cannot fetch task data', error, 'error');
              });
        });
  }

}
