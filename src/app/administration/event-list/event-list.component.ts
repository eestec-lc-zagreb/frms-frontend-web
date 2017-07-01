import { Component, OnInit } from '@angular/core';
import { Event } from '../../shared/models/event.model';
import { EventService } from '../../shared/services/event.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Event[];

  loading: boolean;

  constructor(private eventService: EventService, private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.loading = true;

    this.eventService.getAllEvents()
      .subscribe(events => {
          this.events = events;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.notificationService.notify('Cannot fetch all events', error, 'error');
        }
      );
  }

}
