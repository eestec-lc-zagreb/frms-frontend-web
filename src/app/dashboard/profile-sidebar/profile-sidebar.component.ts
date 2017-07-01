import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';

@Component({
  selector: 'app-profile-sidebar',
  templateUrl: './profile-sidebar.component.html',
  styleUrls: ['./profile-sidebar.component.css']
})
export class ProfileSidebarComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
