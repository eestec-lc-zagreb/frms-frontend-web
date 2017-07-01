import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../shared/services/company.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Company } from '../../shared/models/company.model';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-admin-company-details',
  templateUrl: './admin-company-details.component.html',
  styleUrls: ['./admin-company-details.component.css']
})
export class AdminCompanyDetailsComponent implements OnInit {

  id: number;
  company: Company;

  loading: boolean;

  constructor(private route: ActivatedRoute,
              private companyService: CompanyService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.loading = true;

    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.companyService.getCompanyDetails(this.id)
            .subscribe(
              company => {
                this.company = company;
                this.loading = false;
              },
              error => {
                this.loading = false;
                this.notificationService.notify('Cannot fetch company data', error, 'error');
              });
        });
  }

}
