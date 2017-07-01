import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../../shared/models/task.model';

@Component({
  selector: 'app-active-tasks-list',
  templateUrl: './active-tasks-list.component.html',
  styleUrls: ['./active-tasks-list.component.css']
})
export class ActiveTasksListComponent implements OnInit {

  @Input() tasks: Task[];

  constructor() { }

  ngOnInit() {
  }

}
