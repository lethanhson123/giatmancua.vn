import { Injectable } from '@angular/core';
import { WorkList } from 'src/app/shared/WorkList.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class WorkListService {
  list: WorkList[];
  formData: WorkList;
  aPIURL: string = environment.APIURL;
  controller: string = "WorkList";

  constructor(private httpClient: HttpClient,
    private appGlobalService: AppGlobalService) {
    this.initializationFormData();
  }
  initializationFormData() {
    this.formData = {
      ID: 0
    }
  }
  add(formData: WorkList) {
    let url = this.aPIURL + this.controller + '/Add';
    return this.httpClient.post(url, formData);
  }
  getByID(ID: number) {
    let url = this.aPIURL + this.controller + '/GetByID?ID=' + ID;
    return this.httpClient.get(url).toPromise();
  }
  removeByID(ID: number) {
    let url = this.aPIURL + this.controller + '/RemoveByID?ID=' + ID;
    return this.httpClient.delete(url).toPromise();
  }
  getByYearAndMembershipIDAndProductIDToList(year: number, membershipID: number, productID: number) {
    let url = this.aPIURL + this.controller + '/GetByYearAndMembershipIDAndProductIDToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('membershipID', JSON.stringify(membershipID))
      .set('productID', JSON.stringify(productID))
    return this.httpClient.get(url, { params }).toPromise();
  }
}
