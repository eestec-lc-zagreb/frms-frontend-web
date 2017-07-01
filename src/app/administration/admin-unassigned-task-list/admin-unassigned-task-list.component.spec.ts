/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUnassignedTaskListComponent } from './admin-unassigned-task-list.component';

describe('AdminUnassignedTaskListComponent', () => {
  let component: AdminUnassignedTaskListComponent;
  let fixture: ComponentFixture<AdminUnassignedTaskListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUnassignedTaskListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUnassignedTaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
