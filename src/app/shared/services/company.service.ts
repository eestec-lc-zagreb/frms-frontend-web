import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Company } from '../models/company.model';
import { CONTEXT_PATH } from '../app.constants';

@Injectable()
export class CompanyService {

  static options(): RequestOptions {
    const headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers, withCredentials: true});
  }

  constructor(private http: Http) {
  }

  getCompanyTypes() {
    return this.http.get(CONTEXT_PATH + '/companies/types', CompanyService.options())
      .map(response => <string[]> response.json())
      .catch(this.handleError);
  }

  getCompanyDetails(companyId: number): Observable<Company> {
    return this.http.get(CONTEXT_PATH + '/companies/' + companyId, CompanyService.options())
      .map(response => <Company>response.json())
      .catch(this.handleError);
  }

  createCompany(company: Company): Observable<Response> {
    return this.http.post(CONTEXT_PATH + '/companies', company, CompanyService.options())
      .catch(this.handleError);
  }

  updateCompany(companyId: number, company: Company) {
    return this.http.put(CONTEXT_PATH + '/companies/' + companyId, company, CompanyService.options())
      .catch(this.handleError);
  }

  getAllCompanies(): Observable<Company[]> {
    return this.http.get(CONTEXT_PATH + '/companies', CompanyService.options())
      .map(response => <Company>response.json())
      .catch(this.handleError);
  }

  filterCompanies(name: string, type: string): Observable<Company[]> {
    return this.http.get(
      CONTEXT_PATH + '/companies/search' +
      '?name=' + (name != null ? name : '') +
      '&type=' + (type != null ? type : ''),
      CompanyService.options())
      .map(response => <Company[]>response.json())
      .catch(this.handleError);
  }

  handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.statusMessage || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = 'Error while loading data.';
    }

    return Observable.throw({status: error.status, message: errMsg});
  }
}
