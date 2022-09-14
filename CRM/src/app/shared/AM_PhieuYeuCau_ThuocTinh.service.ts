import { Injectable } from '@angular/core';
import { AM_PhieuYeuCau_ThuocTinh } from 'src/app/shared/AM_PhieuYeuCau_ThuocTinh.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AM_PhieuYeuCau_ThuocTinhService {
  list: AM_PhieuYeuCau_ThuocTinh[];
  formData: AM_PhieuYeuCau_ThuocTinh;
  aPIURL: string = environment.APIURL;
  controller: string = "AM_PhieuYeuCau_ThuocTinh";

  constructor(private httpClient: HttpClient) {
    this.initializationFormData();
  }
  initializationFormData() {
    this.formData = {
      ID: 0
    }
  }    
  getByPhieuYeuCauIDAndCodeToList(phieuYeuCauID:number) {
    let url = this.aPIURL + this.controller + '/GetByPhieuYeuCauIDAndCodeToList';
    const params = new HttpParams()
      .set('phieuYeuCauID', JSON.stringify(phieuYeuCauID))
    return this.httpClient.get(url, { params }).toPromise();
  }
}
