import { Component, Input, OnInit } from '@angular/core';
import { CompanyService } from '../shared/services/company.service';
import { NotificationService } from '../shared/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-company-filter',
  templateUrl: './company-filter.component.html',
  styleUrls: ['./company-filter.component.css']
})
export class CompanyFilterComponent implements OnInit {

  namePattern: string;
  type: string;

  allTypes: string[];

  @Input() navigationPage: string;

  constructor(private companyService: CompanyService,
              private notificationService: NotificationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.companyService.getCompanyTypes()
      .subscribe(
        types => this.allTypes = types,
        error => {
          this.notificationService.notify('Cannot load company types', error, 'error');
        });

    this.route.queryParams
      .subscribe(
        queryParams => {
          this.namePattern = queryParams['name'];
          this.type = queryParams['type'];
        }
      );
  }

  onClear() {
    this.namePattern = null;
    this.type = null;

    this.onFilter();
  }

  onFilter() {
    this.router.navigate(
      [this.navigationPage],
      {
        queryParams: {
          'name': this.namePattern,
          'type': this.type,
        }
      });
  }

}
