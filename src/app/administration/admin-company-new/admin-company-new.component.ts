import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/company.model';
import { NotificationService } from '../../shared/services/notification.service';
import { CompanyService } from '../../shared/services/company.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-company-new',
  templateUrl: './admin-company-new.component.html',
  styleUrls: ['./admin-company-new.component.css']
})
export class AdminCompanyNewComponent implements OnInit {

  model = new Company();
  types: string[];

  submitted: boolean;

  constructor(private companyService: CompanyService,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit() {
    this.types = [];
    this.submitted = false;

    this.companyService.getCompanyTypes()
      .subscribe(
        (types: string[]) => this.types = types,
        error => {
          if (error.status !== 200) {
            this.notificationService.notify('Cannot fetch company types', error, 'error');
          }
        }
      );
  }

  onSubmit() {
    this.submitted = true;

    this.companyService.createCompany(this.model)
      .subscribe(
        res => {
          this.submitted = false;

          if (res.status === 201) {
            this.notificationService.notify('Info', 'Company is successfully created', 'success');
            this.router.navigate(['/administration/companies']);
          }
        },
        error => {
          this.submitted = false;
          this.notificationService.notify('Something  went wrong', error, 'error');
        }
      );
  }

}
