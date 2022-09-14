import { Injectable } from '@angular/core';
import { WorkListMembership } from 'src/app/shared/WorkListMembership.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class WorkListMembershipService {
  list: WorkListMembership[];
  formData: WorkListMembership;
  aPIURL: string = environment.APIURL;
  controller: string = "WorkListMembership";

  constructor(private httpClient: HttpClient,
    private appGlobalService: AppGlobalService) {
    this.initializationFormData();
  }
  initializationFormData() {
    this.formData = {
      ID: 0
    }
  }  
  removeByID(ID: number) {
    let url = this.aPIURL + this.controller + '/RemoveByID?ID=' + ID;
    return this.httpClient.delete(url).toPromise();
  }
  insertByProvinceIDAndCityIDAndWardIDAndTaxCode(parentID:number, provinceID: number, cityID: number, wardID: number, taxCode: string) {
    let url = this.aPIURL + this.controller + '/InsertByProvinceIDAndCityIDAndWardIDAndTaxCode';
    const params = new HttpParams()
      .set('parentID', JSON.stringify(parentID))
      .set('userCreated', JSON.stringify(this.appGlobalService.getCookieMembershipID()))
      .set('provinceID', JSON.stringify(provinceID))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
      .set('taxCode', taxCode)
    return this.httpClient.get(url, { params }).toPromise();
  }
  getByParentIDToList(parentID: number) {
    let url = this.aPIURL + this.controller + '/GetByParentIDToList';
    const params = new HttpParams()
      .set('parentID', JSON.stringify(parentID))      
    return this.httpClient.get(url, { params }).toPromise();
  }
}
