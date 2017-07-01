import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../shared/models/company.model';
import { TaskService } from '../../shared/services/task.service';
import { NotificationService } from '../../shared/services/notification.service';
import { TaskData } from '../../shared/models/task-data.model';

@Component({
  selector: 'app-admin-unassigned-task-list',
  templateUrl: './admin-unassigned-task-list.component.html',
  styleUrls: ['./admin-unassigned-task-list.component.css']
})
export class AdminUnassignedTaskListComponent implements OnInit {

  @Input() companies: Company[];
  @Input() eventId: number;
  @Input() userId: number;
  @Input() type: string;

  submitted: boolean[];

  constructor(private taskService: TaskService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.submitted = [];
    for (const c of this.companies) {
      this.submitted.push(false);
    }
  }

  onAssignCompany(index: number) {
    this.submitted[index] = true;

    const taskData: TaskData = new TaskData();
    taskData.eventId = this.eventId;
    taskData.userId = this.userId;
    taskData.companyId = this.companies[index].id;
    taskData.type = this.type;
    taskData.status = 'IN_PROGRESS';
    taskData.notes = '';

    this.taskService.createTask(taskData)
      .subscribe(
        response => {
          this.submitted[index] = false;
          if (response.status === 201) {
            this.companies.splice(index, 1);
            this.submitted.splice(index, 1);
            this.notificationService.notify('Success', 'Task is successfully created', 'success')
          } else {
            this.notificationService.notify('Something  went wrong', response.statusText, 'error');
          }
        },
        error => {
          this.submitted[index] = false;
          this.notificationService.notify('Something  went wrong', error, 'error');
        }
      );
  }

}
