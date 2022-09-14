import { Injectable } from '@angular/core';
import { Contact } from 'src/app/shared/Contact.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  list: Contact[];
  formData: Contact;
  aPIURL: string = environment.APIURL;
  controller: string = "Contact";

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
}
