import { Component, OnInit } from '@angular/core';
import { EventService } from '../../shared/services/event.service';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Event } from '../../shared/models/event.model';
import { User } from '../../shared/models/user.model';
import { Company } from '../../shared/models/company.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-task-create',
  templateUrl: './admin-task-create.component.html',
  styleUrls: ['./admin-task-create.component.css']
})
export class AdminTaskCreateComponent implements OnInit {

  allEvents: Event[];
  allUsers: User[];
  allTypes: string[];

  allCompanies: Company[];
  companies: Company[];

  selectedEventId: number;
  selectedUserId: number;
  selectedType: string;

  name: string;
  type: string;

  changeEventLoading: boolean;

  constructor(private eventService: EventService,
              private userService: UserService,
              private notificationService: NotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.changeEventLoading = false;

    this.allEvents = [];
    this.allUsers = [];
    this.companies = [];
    this.allCompanies = [];
    this.allTypes = ['FINANCIAL', 'MATERIAL'];

    this.eventService.getAllEvents()
      .subscribe(
        events => this.allEvents = events,
        error => {
          this.notificationService.notify('Cannot load events', error, 'error');
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
        params => {
          this.companies = this.allCompanies.slice();

          this.name = params['name'];
          this.type = params['type'];

          this.filterCompanies();
        }
      );
  }

  onChangeEvent() {
    this.changeEventLoading = true;

    this.eventService.getUnassignedCompaniesForEvent(this.selectedEventId)
      .subscribe(
        companies => {
          this.allCompanies = companies;
          this.companies = this.allCompanies.slice();

          this.filterCompanies();

          this.changeEventLoading = false;
        },
        error => {
          this.changeEventLoading = false;
          this.notificationService.notify('Cannot load unassigned companies for event', error, 'error');
        });
  }

  filterCompanies() {
    if (this.name != null) {
      this.companies = this.companies.filter(c => c.name.toLowerCase().includes(this.name.toLowerCase()));
    }

    if (this.type != null) {
      this.companies = this.companies.filter(c => c.type.toLowerCase() === this.type.toLowerCase());
    }
  }

}
