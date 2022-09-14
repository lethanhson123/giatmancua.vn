import { Injectable } from '@angular/core';
import { Customer } from 'src/app/shared/Customer.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  list: Customer[];
  formData: Customer;
  aPIURL: string = environment.APIURL;
  controller: string = "Customer";

  constructor(private httpClient: HttpClient,
    private appGlobalService: AppGlobalService) {
    this.initializationFormData();
  }
  initializationFormData() {
    this.formData = {
      ID: 0     
    }
  }
  getByActiveAndSearchStringToList(active: boolean, searchString: string) {
    let url = this.aPIURL + this.controller + '/GetByActiveAndSearchStringToList';
    const params = new HttpParams()
      .set('active', JSON.stringify(active))             
      .set('searchString', searchString)             
    return this.httpClient.get(url, { params }).toPromise();
  }  
  getByID(ID: number) {
    let url = this.aPIURL + this.controller + '/GetByID?ID=' + ID;
    return this.httpClient.get(url).toPromise();
  }  
  
  save(formData: Customer) {
    let url = this.aPIURL + this.controller + '/Save';
    return this.httpClient.post(url, formData);
  }  
}
