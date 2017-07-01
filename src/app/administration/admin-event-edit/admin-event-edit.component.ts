import { Component, OnInit } from '@angular/core';
import { Event } from '../../shared/models/event.model';
import { EventService } from '../../shared/services/event.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-admin-event-edit',
  templateUrl: './admin-event-edit.component.html',
  styleUrls: ['./admin-event-edit.component.css']
})
export class AdminEventEditComponent implements OnInit {

  id: number;
  model = new Event();
  editMode: boolean;

  event: Event;

  pageLoading: boolean;
  submitted: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private eventService: EventService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.editMode = false;
    this.pageLoading = false;
    this.submitted = false;

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;

          if (this.editMode) {
            this.pageLoading = true;

            this.eventService.getEvent(this.id)
              .subscribe(
                event => {
                  this.event = event;
                  this.populateModel();
                  this.pageLoading = false;
                },
                error => {
                  this.pageLoading = false;
                  if (error.status !== 200 || error.status !== 201) {
                    this.notificationService.notify('Something went wrong', error, 'error');
                  }
                }
              );
          }
        }
      );
  }

  populateModel() {
    this.model.id = this.event.id;
    this.model.name = this.event.name;
    this.model.shortName = this.event.shortName;
    this.model.year = this.event.year;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editMode) {
      this.eventService.updateEvent(this.id, this.model)
        .subscribe(
          res => {
            this.submitted = false;

            if (res.status === 200) {
              this.notificationService.notify('Info', 'Event is successfully updated', 'info');
            }
          },
          error => {
            this.submitted = false;
            this.notificationService.notify('Something went wrong', error, 'error');
          }
        );
    } else {
      this.eventService.createEvent(this.model)
        .subscribe(
          res => {
            this.submitted = false;

            if (res.status === 201) {
              this.notificationService.notify('Info', 'Event is successfully created', 'success');
              this.router.navigate(['/administration/events']);
            }
          },
          error => {
            this.submitted = false;
            this.notificationService.notify('Something went wrong', error, 'error');
          }
        );
    }


  }

}
