import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { NotificationService } from '../../shared/services/notification.service';
import { AuthorizationService } from '../../shared/services/authorization.service';

@Component({
  selector: 'app-admin-user-edit',
  templateUrl: './admin-user-edit.component.html',
  styleUrls: ['./admin-user-edit.component.css']
})
export class AdminUserEditComponent implements OnInit {

  id: number;
  model = new User();
  editMode: boolean;

  user: User;

  password: string;
  confirmPassword: string;

  changePasswordMode: boolean;
  isAdmin: boolean;

  roles: string[];

  userLoading: boolean;
  submitted: boolean;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private userService: UserService,
              private notificationService: NotificationService,
              private authService: AuthorizationService) {
  }

  ngOnInit() {
    this.editMode = false;
    this.userLoading = false;
    this.submitted = false;

    this.roles = ['USER', 'ADMIN'];
    this.isAdmin = this.authService.getCurrentUser().role === 'ADMIN';

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.changePasswordMode = !this.editMode;

          if (this.editMode) {
            this.userLoading = true;

            this.userService.getUser(this.id)
              .subscribe(
                user => {
                  this.user = user;
                  this.populateModel();
                  this.userLoading = false;
                },
                error => {
                  this.userLoading = false;

                  if (error.status !== 200 || error.status !== 201) {
                    this.notificationService.notify('Cannot fetch user data', error, 'error');
                  }
                }
              );
          }
        }
      );
  }

  populateModel() {
    this.model.id = this.user.id;
    this.model.firstName = this.user.firstName;
    this.model.lastName = this.user.lastName;
    this.model.email = this.user.email;
    this.model.phoneNumber = this.user.phoneNumber;
    this.model.role = this.user.role;
  }

  onChangePassword() {
    this.changePasswordMode = !this.changePasswordMode;
  }

  onSubmit() {
    this.submitted = true;

    if (this.authService.loggedUser.role !== 'ADMIN') {
      this.model.role = 'USER';
    }
    const userModel = <{}>this.model;
    if (this.password != null) {
      userModel['password'] = this.password;
    }

    if (this.editMode) {
      this.userService.updateUser(this.id, this.model)
        .subscribe(
          res => {
            this.submitted = false;

            if (res.status === 200) {
              this.notificationService.notify('Info', 'User is successfully updated', 'info');
              if (this.id === this.authService.loggedUser.id) {
                this.authService.userStateChanged.next(this.model);
              }
            }
          },
          error => {
            this.submitted = false;
            this.notificationService.notify('Something went wrong', error, 'error');
          }
        );
    } else {
      this.userService.createUser(this.model)
        .subscribe(
          res => {
            this.submitted = false;

            if (res.status === 201) {
              this.notificationService.notify('Info', 'User is successfully created', 'success');
              this.router.navigate(['/administration/users']);
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
