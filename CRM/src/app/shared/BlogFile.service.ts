import { Injectable } from '@angular/core';
import { BlogFile } from 'src/app/shared/BlogFile.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class BlogFileService {
  list: BlogFile[];
  formData: BlogFile;
  aPIURL: string = environment.APIURL;
  controller: string = "BlogFile";

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
  saveAndUploadImage(formData: BlogFile, fileToUpload: File) {
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
