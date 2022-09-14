import { Injectable } from '@angular/core';
import { BlogTag } from 'src/app/shared/BlogTag.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class BlogTagService {
  list: BlogTag[];
  formData: BlogTag;
  aPIURL: string = environment.APIURL;
  controller: string = "BlogTag";

  constructor(private httpClient: HttpClient,
    private appGlobalService: AppGlobalService) {
    this.initializationFormData();
  }
  initializationFormData() {
    this.formData = {
      ID: 0     
    }
  }
  getByParentIDToList(parentID: number) {
    let url = this.aPIURL + this.controller + '/GetByParentIDToList';
    const params = new HttpParams()
      .set('parentID', JSON.stringify(parentID))
    return this.httpClient.get(url, { params }).toPromise();
  }  
  removeByID(ID: number) {
    let url = this.aPIURL + this.controller + '/RemoveByID';
    const params = new HttpParams()
      .set('ID', JSON.stringify(ID))
    return this.httpClient.get(url, { params }).toPromise();
  }  
  save(formData: BlogTag) {
    let url = this.aPIURL + this.controller + '/Save';
    return this.httpClient.post(url, formData);
  }  
}
