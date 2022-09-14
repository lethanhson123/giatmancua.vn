import { Injectable } from '@angular/core';
import { AM_PhieuYeuCau } from 'src/app/shared/AM_PhieuYeuCau.model';
import { AM_PhieuYeuCau_Detail_ViewModel } from 'src/app/shared/AM_PhieuYeuCau_Detail_ViewModel.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class AM_PhieuYeuCauService {
  list: AM_PhieuYeuCau[];
  formData: AM_PhieuYeuCau;
  formDataViewModel: AM_PhieuYeuCau_Detail_ViewModel;
  aPIURL: string = environment.APIURL;
  controller: string = "AM_PhieuYeuCau";

  constructor(private httpClient: HttpClient,
    private appGlobalService: AppGlobalService) {
    this.initializationFormData();
    this.initializationFormDataViewModel();
  }
  initializationFormData() {
    this.formData = {
      ID: 0
    }
  }
  initializationFormDataViewModel() {
    this.formDataViewModel = {
      ID: 0
    }
  }
  getByID(ID: number) {
    let url = this.aPIURL + this.controller + '/GetByID?ID=' + ID;
    return this.httpClient.get(url).toPromise();
  }
  deleteByID(ID: number) {
    let url = this.aPIURL + this.controller + '/RemoveByID?ID=' + ID;
    return this.httpClient.delete(url).toPromise();
  }
  getByNguoiTaoIDToList() {
    let url = this.aPIURL + this.controller + '/GetByNguoiTaoIDToList';
    const params = new HttpParams()
      .set('nguoiTaoID', JSON.stringify(this.appGlobalService.getCookieMembershipID()))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getCount() {
    let url = this.aPIURL + this.controller + '/GetCount';   
    return this.httpClient.get(url).toPromise();
  }
  getDaGuiToList() {
    let url = this.aPIURL + this.controller + '/GetDaGuiToList';   
    return this.httpClient.get(url).toPromise();
  }
  getDaNhanToList() {
    let url = this.aPIURL + this.controller + '/GetDaNhanToList';   
    return this.httpClient.get(url).toPromise();
  }
  getDangXuLyToList() {
    let url = this.aPIURL + this.controller + '/GetDangXuLyToList';   
    return this.httpClient.get(url).toPromise();
  }
  getHoanThanhToList() {
    let url = this.aPIURL + this.controller + '/GetHoanThanhToList';   
    return this.httpClient.get(url).toPromise();
  }
  getDaGuiAndDaNhanAndDangXuLyToList() {
    let url = this.aPIURL + this.controller + '/GetDaGuiAndDaNhanAndDangXuLyToList';   
    return this.httpClient.get(url).toPromise();
  }  
  dangXuLy(ID: number) {
    let url = this.aPIURL + this.controller + '/DangXuLy';
    const params = new HttpParams()
      .set('ID', JSON.stringify(ID))    
    return this.httpClient.get(url, { params }).toPromise();
  }
  daNhan(ID: number) {
    let url = this.aPIURL + this.controller + '/DaNhan';
    const params = new HttpParams()
      .set('ID', JSON.stringify(ID))    
    return this.httpClient.get(url, { params }).toPromise();
  }
  postHoaDonDienTu(aM_PhieuYeuCau_Detail_ViewModel: AM_PhieuYeuCau_Detail_ViewModel, fileToUpload: FileList) {
    let url = this.aPIURL + this.controller + '/PostHoaDonDienTu';
    const formUpload: FormData = new FormData();
    formUpload.append('aM_PhieuYeuCau_Detail_ViewModel', JSON.stringify(aM_PhieuYeuCau_Detail_ViewModel));    
    if (fileToUpload != null) {
      for (var i = 0; i < fileToUpload.length; i++) {
        formUpload.append("file[]", fileToUpload[i]);
      }
    }
    return this.httpClient.post(url, formUpload);
  }
  postHoaDonDienTuHoanThanh(aM_PhieuYeuCau_Detail_ViewModel: AM_PhieuYeuCau_Detail_ViewModel) {
    let url = this.aPIURL + this.controller + '/PostHoaDonDienTuHoanThanh';
    const formUpload: FormData = new FormData();
    formUpload.append('aM_PhieuYeuCau_Detail_ViewModel', JSON.stringify(aM_PhieuYeuCau_Detail_ViewModel));       
    return this.httpClient.post(url, formUpload);
  }
}
