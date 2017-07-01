import { Component, OnInit } from '@angular/core';
import { Company } from '../../shared/models/company.model';
import { CompanyService } from '../../shared/services/company.service';
import { NotificationService } from '../../shared/services/notification.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  companies: Company[];

  // filtering data
  name: string;
  type: string;
  // end filtering data

  pageLoading: boolean;
  filterLoading: boolean;

  constructor(private companyService: CompanyService,
              private notificationService: NotificationService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.pageLoading = true;
    this.filterLoading = false;

    this.companyService.getAllCompanies()
      .subscribe(
        companies => {
          this.companies = companies;
          this.pageLoading = false;
        },
        error => {
          this.pageLoading = false;
          this.notificationService.notify('Cannot fetch all companies', error, 'error');
        }
      );

    this.route.queryParams
      .subscribe(
        queryParams => {
          this.filterLoading = true;

          this.name = queryParams['name'];
          this.type = queryParams['type'];

          this.companyService.filterCompanies(this.name, this.type)
            .subscribe(
              companies => {
                this.companies = companies;
                this.filterLoading = false;
              },
              error => {
                this.filterLoading = false;
                this.notificationService.notify('Cannot load filtered companies', error, 'error');
              });
        }
      );
  }

}
