import { Injectable } from '@angular/core';
import { BlogCategory } from 'src/app/shared/BlogCategory.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class BlogCategoryService {
  list: BlogCategory[];
  formData: BlogCategory;
  aPIURL: string = environment.APIURL;
  controller: string = "BlogCategory";

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
  save(formData: BlogCategory) {    
    let url = this.aPIURL + this.controller + '/Save';
    const uploadData = JSON.stringify(formData);
    const formUpload: FormData = new FormData();
    formUpload.append('data', uploadData);    
    return this.httpClient.post(url, formUpload);
  }
  saveAndUploadImage(formData: BlogCategory, fileToUpload: File) {
    let url = this.aPIURL + this.controller + '/SaveAndUploadImage';
    const uploadData = JSON.stringify(formData);
    const formUpload: FormData = new FormData();
    formUpload.append('data', uploadData);
    if (fileToUpload == null) {
      fileToUpload = new File(["fileToUpload"], "fileToUpload.txt", {
        type: "text/plain",
      });
    }
    formUpload.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formUpload);
  }
}
