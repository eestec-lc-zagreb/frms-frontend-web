import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { AuthorizationService } from '../shared/services/authorization.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  id: number;
  content: string;

  pageLoading: boolean;
  saveButtonLoading: boolean;

  constructor(
    private userService: UserService,
    private authService: AuthorizationService,
    private notificationService: NotificationService) { }

  ngOnInit() {
    this.pageLoading = true;
    this.saveButtonLoading = false;

    this.id = this.authService.getCurrentUser().id;
    this.userService.getUserNotes(this.id)
      .subscribe(notes => {
        this.content = notes;
        this.pageLoading = false;
      });
  }

  save() {
    this.saveButtonLoading = true;

    this.userService.updateUserNotes(this.id, this.content)
      .subscribe(
        res => {
          if (res.status === 200) {
            this.saveButtonLoading = false;
            this.notificationService.notify('Info', 'Notes are successfully updated', 'info');
          }
        },
        error => {
          this.notificationService.notify('Cannot update user notes', error, 'error');
        }
      );
  }

}
