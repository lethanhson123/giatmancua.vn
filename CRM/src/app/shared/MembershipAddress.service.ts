import { Injectable } from '@angular/core';
import { MembershipAddress } from 'src/app/shared/MembershipAddress.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipAddressService {
  list: MembershipAddress[];
  formData: MembershipAddress;
  aPIURL: string = environment.APIURL;
  controller: string = "MembershipAddress";

  constructor(private httpClient: HttpClient,
    private appGlobalService: AppGlobalService) {
    this.initializationFormData();
  }
  initializationFormData() {
    this.formData = {
      ID: 0
    }
  }
  save(formData: MembershipAddress) {    
    let url = this.aPIURL + this.controller + '/Save';
    const uploadData = JSON.stringify(formData);
    const formUpload: FormData = new FormData();
    formUpload.append('data', uploadData);    
    return this.httpClient.post(url, formUpload);
  }
  removeByID(ID: number) {
    let url = this.aPIURL + this.controller + '/RemoveByID';
    const params = new HttpParams()
      .set('ID', JSON.stringify(ID))
    return this.httpClient.get(url, { params }).toPromise();
  }  
  getAllToList() {
    let url = this.aPIURL + this.controller + '/GetAllToList';
    return this.httpClient.get(url).toPromise();
  }
  getByParentIDToList(parentID: number) {
    let url = this.aPIURL + this.controller + '/GetByParentIDToList';
    const params = new HttpParams()
      .set('parentID', JSON.stringify(parentID))
    return this.httpClient.get(url, { params }).toPromise();
  }  
}
