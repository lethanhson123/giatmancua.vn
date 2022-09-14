import { Injectable } from '@angular/core';
import { Blog } from 'src/app/shared/Blog.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  list: Blog[];
  formData: Blog;
  aPIURL: string = environment.APIURL;
  controller: string = "Blog";

  constructor(private httpClient: HttpClient,
    private appGlobalService: AppGlobalService) {
    this.initializationFormData();
  }
  initializationFormData() {
    this.formData = {
      ID: 0
    }
  }
  getAllToList() {
    let url = this.aPIURL + this.controller + '/GetAllToList';
    return this.httpClient.get(url).toPromise();
  }
  initializationSiteMapToXML() {
    let url = this.aPIURL + this.controller + '/InitializationSiteMapToXML';
    return this.httpClient.get(url).toPromise();
  }
  getByParentIDToList(parentID: number) {
    let url = this.aPIURL + this.controller + '/GetByParentIDToList';
    const params = new HttpParams()
      .set('parentID', JSON.stringify(parentID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getByParentIDOrSearchToList(parentID: number, search: string) {
    let url = this.aPIURL + this.controller + '/GetByParentIDOrSearchToList';
    const params = new HttpParams()
      .set('parentID', JSON.stringify(parentID))
      .set('search', search)
    return this.httpClient.get(url, { params }).toPromise();
  }
  getByParentIDOrSearchOrIsBannerToList(parentID: number, search: string, isBanner: boolean) {
    let url = this.aPIURL + this.controller + '/GetByParentIDOrSearchOrIsBannerToList';
    const params = new HttpParams()
      .set('parentID', JSON.stringify(parentID))
      .set('search', search)
      .set('isBanner', JSON.stringify(isBanner))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getByID(ID: number) {
    let url = this.aPIURL + this.controller + '/GetByID';
    const params = new HttpParams()
      .set('ID', JSON.stringify(ID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getByIDString(ID: string) {
    let url = this.aPIURL + this.controller + '/GetByIDString';
    const params = new HttpParams()
      .set('ID', ID)
    return this.httpClient.get(url, { params }).toPromise();
  }
  saveAndUploadImage(formData: Blog, fileToUpload: FileList, isTapTinDinhKem: boolean) {
    let url = this.aPIURL + this.controller + '/SaveAndUploadImage';
    const uploadData = JSON.stringify(formData);
    const isTapTinDinhKemData = JSON.stringify(isTapTinDinhKem);
    const formUpload: FormData = new FormData();
    formUpload.append('data', uploadData);
    formUpload.append('IsTapTinDinhKem', isTapTinDinhKemData);
    if (fileToUpload) {
      if (fileToUpload.length > 0) {
        for (var i = 0; i < fileToUpload.length; i++) {
          formUpload.append('file[]', fileToUpload[i]);
        }
      }
    }
    return this.httpClient.post(url, formUpload);
  }
}
