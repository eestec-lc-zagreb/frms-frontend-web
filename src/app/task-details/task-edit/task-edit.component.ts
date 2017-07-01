import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../../shared/models/task.model';
import { TaskData } from '../../shared/models/task-data.model';
import { TaskService } from '../../shared/services/task.service';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthorizationService } from '../../shared/services/authorization.service';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  model = new TaskData();
  eventName: string;
  companyname: string;
  assigneeName: string;
  sponsorshipType: string;

  isAdmin: boolean;

  submitted: boolean;

  allUsers: User[];
  allTypes: string[];

  @Input() task: Task;

  datepickerOpts = {
    autoclose: true,
    todayBtn: 'linked',
    icon: 'fa fa-calendar',
    todayHighlight: true,
    assumeNearbyYear: true,
    format: 'D, d/mm/yyyy'
  };

  timepickerOpts = {
    showMeridian: false,
    minuteStep: 5,
    icon: 'fa fa-clock-o'
  };

  constructor(
    private taskService: TaskService,
    private userService: UserService,
    private notificationService: NotificationService,
    private authService: AuthorizationService) {
  }

  ngOnInit() {
    this.submitted = false;

    this.allUsers = [];
    this.allTypes = ['FINANCIAL', 'MATERIAL'];

    this.populateModel();

    this.eventName = this.task.event.name;
    this.companyname = this.task.company.name;
    this.assigneeName = this.task.assignee.firstName + ' ' + this.task.assignee.lastName;
    this.sponsorshipType = this.task.type;

    this.userService.getAllUsers()
      .subscribe(
        users => this.allUsers = users,
        error => {
          this.notificationService.notify('Something went wrong', error, 'error');
        }
      );

    this.isAdmin = this.authService.getCurrentUser().role === 'ADMIN';
  }

  onSubmit() {
    this.submitted = true;

    this.taskService.updateTask(this.task.id, this.model)
      .subscribe(
        res => {
          this.submitted = false;
          if (res.status === 200) {
            this.notificationService.notify('Info', 'Task is successfully updated', 'info');
          }
        },
        error => {
          this.submitted = false;
          this.notificationService.notify('Something went wrong', error, 'error');
        }
      );
  }

  populateModel() {
    this.model.id = this.task.id;
    this.model.eventId = this.task.event.id;
    this.model.userId = this.task.assignee.id;
    this.model.companyId = this.task.company.id;
    this.model.status = this.task.status;
    this.model.notes = this.task.notes;
    this.model.type = this.task.type;

    if (this.task.callTime) {
      this.model.callTime = new Date(this.task.callTime);
    }

    if (this.task.mailTime) {
      this.model.mailTime = new Date(this.task.mailTime);
    }

    if (this.task.followUpTime) {
      this.model.followUpTime = new Date(this.task.followUpTime);
    }
  }

}
