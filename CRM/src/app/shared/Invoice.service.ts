import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Invoice } from 'src/app/shared/Invoice.model';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  list: Invoice[];  
  formData: Invoice;
  aPIURL: string = environment.APIURL;
  controller: string = "Invoice";
  constructor(private httpClient: HttpClient) {
    this.initializationFormData();
  }
  initializationFormData() {
    this.formData = {
      ID: 0
    }
  }
  asyncGetDataTransferByYearAndMonthAndCityIDAndWardID001ToList(year: number, month: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/AsyncGetDataTransferByYearAndMonthAndCityIDAndWardID001ToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  asyncGetByMembershipIDToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/AsyncGetByMembershipIDToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))      
    return this.httpClient.get(url, { params }).toPromise();
  }
  getByMembershipIDAndProductIDToList(membershipID: number, productID: number) {
    let url = this.aPIURL + this.controller + '/GetByMembershipIDAndProductIDToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))      
      .set('productID', JSON.stringify(productID))      
    return this.httpClient.get(url, { params }).toPromise();
  }
  deleteByYearAndMonth(year: number, month: number) {
    let url = this.aPIURL + this.controller + '/DeleteByYearAndMonth';
    const params = new HttpParams()
    .set('year', JSON.stringify(year))      
    .set('month', JSON.stringify(month))      
    return this.httpClient.delete(url, { params });
  }
}
