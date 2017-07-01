import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ToastyModule } from 'ng2-toasty';
import { NKDatetimeModule } from 'ng2-datetime/ng2-datetime';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileSidebarComponent } from './dashboard/profile-sidebar/profile-sidebar.component';
import { Route, RouterModule } from '@angular/router';
import { ActiveTasksListComponent } from './dashboard/active-tasks-list/active-tasks-list.component';
import { UserHistoryComponent } from './dashboard/user-history/user-history.component';
import { LoginComponent } from './login/login.component';
import { AuthorizationService } from './shared/services/authorization.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { NotificationService } from './shared/services/notification.service';
import { UserService } from './shared/services/user.service';
import { TaskService } from './shared/services/task.service';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskEditComponent } from './task-details/task-edit/task-edit.component';
import { CompanyEditComponent } from './task-details/company-edit/company-edit.component';
import { CompanyService } from './shared/services/company.service';
import { NotesComponent } from './notes/notes.component';
import { AdministrationComponent } from './administration/administration.component';
import { AdminSidebarComponent } from './administration/admin-sidebar/admin-sidebar.component';
import { EventListComponent } from './administration/event-list/event-list.component';
import { UserListComponent } from './administration/user-list/user-list.component';
import { CompanyListComponent } from './administration/company-list/company-list.component';
import { AdminTaskListComponent } from './administration/task-list/task-list.component';
import { EventService } from './shared/services/event.service';
import { AdminCompanyDetailsComponent } from './administration/admin-company-details/admin-company-details.component';
import { AdminTaskDetailsComponent } from './administration/admin-task-details/admin-task-details.component';
import { AdminEventEditComponent } from './administration/admin-event-edit/admin-event-edit.component';
import { AdminUserEditComponent } from './administration/admin-user-edit/admin-user-edit.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFilterComponent } from './task-filter/task-filter.component';
import { CompanyFilterComponent } from './company-filter/company-filter.component';
import { AdminCompanyNewComponent } from './administration/admin-company-new/admin-company-new.component';
import { AdminTaskCreateComponent } from './administration/admin-task-create/admin-task-create.component';
import { AdminUnassignedTaskListComponent } from './administration/admin-unassigned-task-list/admin-unassigned-task-list.component';
import { SpinnerModule } from 'angular2-spinner/dist';
import { LoginGuard } from './shared/guards/login.guard';
import { AdminGuard } from './shared/guards/admin.guard';
import { ProfileGuard } from './shared/guards/profile.guard';

const appRoutes: Route[] = [
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'tasks/:id', component: TaskDetailsComponent, canActivate: [AuthGuard]},
  {path: 'tasks', component: TaskListComponent, canActivate: [AuthGuard]},
  {path: 'notes', component: NotesComponent, canActivate: [AuthGuard]},
  {path: 'users/:id', component: AdminUserEditComponent, canActivate: [AuthGuard, ProfileGuard]},
  {
    path: 'administration', component: AdministrationComponent, canActivate: [AdminGuard], children: [
    {path: 'events', component: EventListComponent},
    {path: 'events/new', component: AdminEventEditComponent},
    {path: 'events/:id', component: AdminEventEditComponent},
    {path: 'users', component: UserListComponent},
    {path: 'users/new', component: AdminUserEditComponent},
    {path: 'users/:id', component: AdminUserEditComponent},
    {path: 'companies', component: CompanyListComponent},
    {path: 'companies/new', component: AdminCompanyNewComponent},
    {path: 'companies/:id', component: AdminCompanyDetailsComponent},
    {path: 'tasks/new', component: AdminTaskCreateComponent},
    {path: 'tasks/:id', component: AdminTaskDetailsComponent},
    {path: 'tasks', component: AdminTaskListComponent}
  ]
  },
  {path: '**', redirectTo: 'dashboard'}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    ProfileSidebarComponent,
    ActiveTasksListComponent,
    UserHistoryComponent,
    LoginComponent,
    TaskDetailsComponent,
    TaskEditComponent,
    CompanyEditComponent,
    TaskListComponent,
    NotesComponent,
    AdministrationComponent,
    AdminSidebarComponent,
    EventListComponent,
    UserListComponent,
    CompanyListComponent,
    AdminTaskListComponent,
    AdminCompanyDetailsComponent,
    AdminTaskDetailsComponent,
    AdminEventEditComponent,
    AdminUserEditComponent,
    TaskFilterComponent,
    CompanyFilterComponent,
    AdminCompanyNewComponent,
    AdminTaskCreateComponent,
    AdminUnassignedTaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    ToastyModule.forRoot(),
    NKDatetimeModule,
    SpinnerModule
  ],
  providers: [
    AuthorizationService,
    AuthGuard,
    LoginGuard,
    AdminGuard,
    ProfileGuard,
    NotificationService,
    UserService,
    TaskService,
    CompanyService,
    EventService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
