import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../../shared/models/company.model';
import { CompanyService } from '../../shared/services/company.service';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})
export class CompanyEditComponent implements OnInit {

  model = new Company();
  types: string[];

  @Input() company: Company;

  submitted: boolean;

  constructor(private companyService: CompanyService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.submitted = false;

    this.types = [];

    this.companyService.getCompanyTypes()
      .subscribe(
        (types: string[]) => this.types = types,
        error => {
          if (error.status !== 200) {
            this.notificationService.notify('Cannot fetch company types', error, 'error');
          }
        }
      );

    this.populateModel();
  }

  onSubmit() {
    this.submitted = true;

    this.companyService.updateCompany(this.company.id, this.model)
      .subscribe(
        res => {
          this.submitted = false;
          if (res.status === 200) {
            this.notificationService.notify('Info', 'Company is successfully updated', 'info');
          }
        },
        error => {
          this.submitted = false;
          this.notificationService.notify('Something went wrong', error, 'error');
        }
      );
  }

  populateModel() {
    this.model.id = this.company.id;
    this.model.name = this.company.name;
    this.model.shortName = this.company.shortName;
    this.model.type = this.company.type;
    this.model.address = this.company.address;
    this.model.webAddress = this.company.webAddress;
    this.model.notes = this.company.notes;
  }

}
