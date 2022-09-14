import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { InvoiceProperty } from 'src/app/shared/InvoiceProperty.model';

@Injectable({
  providedIn: 'root'
})
export class InvoicePropertyService {

  list: InvoiceProperty[];
  formData: InvoiceProperty;
  aPIURL: string = environment.APIURL;
  controller: string = "InvoiceProperty";
  constructor(private httpClient: HttpClient) {
    this.initializationFormData();
  }
  initializationFormData() {
    this.formData = {
      ID: 0
    }
  }
  getDataTransferByMembershipIDToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/GetDataTransferByMembershipIDToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDataTransferCountByMembershipIDToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/GetDataTransferCountByMembershipIDToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  } year
  getDataTransferByMembershipIDAndYearAndMonthToList(membershipID: number, year: number, month: number) {
    let url = this.aPIURL + this.controller + '/GetDataTransferByMembershipIDAndYearAndMonthToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDataTransferCountByMembershipIDAndYearAndMonthToList(membershipID: number, year: number, month: number) {
    let url = this.aPIURL + this.controller + '/GetDataTransferCountByMembershipIDAndYearAndMonthToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
    return this.httpClient.get(url, { params }).toPromise();
  }
}
