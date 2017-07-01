import { Component, Input, OnInit } from '@angular/core';
import { EventService } from '../shared/services/event.service';
import { CompanyService } from '../shared/services/company.service';
import { Event } from '../shared/models/event.model';
import { Company } from '../shared/models/company.model';
import { NotificationService } from '../shared/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user.service';
import { AuthorizationService } from '../shared/services/authorization.service';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrls: ['./task-filter.component.css']
})
export class TaskFilterComponent implements OnInit {

  eventId: number;
  companyId: number;
  userId: number;
  type: string;
  status: string;

  allEvents: Event[];
  allCompanies: Company[];
  allUsers: User[];
  types: string[];
  statuses: string[];

  isAdmin: boolean;

  @Input() navigationPage: string;

  constructor(private eventService: EventService,
              private companyService: CompanyService,
              private userService: UserService,
              private notificationService: NotificationService,
              private authService: AuthorizationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.types = ['FINANCIAL', 'MATERIAL'];
    this.statuses = ['IN_PROGRESS', 'ACCEPTED', 'DECLINED'];

    this.eventService.getAllEvents()
      .subscribe(
        events => this.allEvents = events,
        error => {
          this.notificationService.notify('Cannot load events', error, 'error');
        }
      );

    this.companyService.getAllCompanies()
      .subscribe(
        companies => this.allCompanies = companies,
        error => {
          this.notificationService.notify('Cannot load companies', error, 'error');
        }
      );

    this.userService.getAllUsers()
      .subscribe(
        users => this.allUsers = users,
        error => {
          this.notificationService.notify('Cannot load users', error, 'error');
        }
      );

    this.route.queryParams
      .subscribe(
        queryParams => {
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
        }
      );

    this.isAdmin = this.authService.getCurrentUser().role === 'ADMIN';
  }

  onClear() {
    this.eventId = null;
    this.companyId = null;
    this.type = null;
    this.status = null;

    if (this.isAdmin) {
      this.userId = null;
    }

    this.onFilter();
  }

  onFilter() {
    this.router.navigate(
      [this.navigationPage],
      {
        queryParams: {
          'eventId': this.eventId,
          'companyId': this.companyId,
          'userId': this.userId,
          'type': this.type,
          'status': this.status
        }
      });
  }

}
