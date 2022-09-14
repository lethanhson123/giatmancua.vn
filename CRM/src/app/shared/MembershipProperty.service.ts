import { Injectable } from '@angular/core';
import { MembershipProperty } from 'src/app/shared/MembershipProperty.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class MembershipPropertyService {

  list: MembershipProperty[];
  formData: MembershipProperty;
  aPIURL: string = environment.APIURL;
  controller: string = "MembershipProperty";

  constructor(private httpClient: HttpClient) {
    this.initializationFormData();
  }
  initializationFormData() {
    this.formData = {
      ID: 0      
    }
  }
  getByID(ID: number) {
    let url = this.aPIURL + this.controller + '/GetByID?ID=' + ID;
    return this.httpClient.get(url).toPromise();
  }
  getDataTransferPhanQuyenByID(ID: number) {
    let url = this.aPIURL + this.controller + '/GetDataTransferPhanQuyenByID?ID=' + ID;
    return this.httpClient.get(url).toPromise();
  }
  deleteByID(ID: number) {
    let url = this.aPIURL + this.controller + '/RemoveByID?ID=' + ID;
    return this.httpClient.delete(url).toPromise();
  }
  asyncGetDataTransferProductByMembershipIDAndCodeToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/AsyncGetDataTransferProductByMembershipIDAndCodeToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  asyncGetDataTransferProductCountByMembershipIDAndCodeToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/AsyncGetDataTransferProductCountByMembershipIDAndCodeToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  asyncGetDataTransferPhanCongQuanLyByCityIDToList(cityID: number) {
    let url = this.aPIURL + this.controller + '/AsyncGetDataTransferPhanCongQuanLyByCityIDToList';
    const params = new HttpParams()
      .set('cityID', JSON.stringify(cityID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  asyncGetDataTransferPhanCongQuanLyByMembershipIDToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/AsyncGetDataTransferPhanCongQuanLyByMembershipIDToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  asyncGetDataTransferPhanQuyenByMembershipIDToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/AsyncGetDataTransferPhanQuyenByMembershipIDToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getFileDinhKemByCodeAndMembershipIDToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/GetFileDinhKemByCodeAndMembershipIDToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getFileDinhKemByCodeAndParentIDToList(parentID: number) {
    let url = this.aPIURL + this.controller + '/GetFileDinhKemByCodeAndParentIDToList';
    const params = new HttpParams()
      .set('parentID', JSON.stringify(parentID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDataTransferNguoiLienHeByMembershipIDAndCodeToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/GetDataTransferNguoiLienHeByMembershipIDAndCodeToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDataTransferProductDistinctByMembershipIDAndCodeToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/GetDataTransferProductDistinctByMembershipIDAndCodeToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDataTransferPhatTrienByMembershipIDAndCodeToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/GetDataTransferPhatTrienByMembershipIDAndCodeToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDataTransferTiepCanByMembershipIDAndCodeToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/GetDataTransferTiepCanByMembershipIDAndCodeToList';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  }  
  postPhanCongQuanLy(formData: MembershipProperty) {
    let url = this.aPIURL + this.controller + '/PostPhanCongQuanLy';
    return this.httpClient.post(url, formData);
  }
  postPhanCongQuanLyByWardList(formData: MembershipProperty) {
    let url = this.aPIURL + this.controller + '/PostPhanCongQuanLyByWardList';
    return this.httpClient.post(url, formData);
  }
  postNguoiLienHe(formData: MembershipProperty) {
    let url = this.aPIURL + this.controller + '/PostNguoiLienHe';
    return this.httpClient.post(url, formData);
  }
  updateItemsPhanQuyenByMembershipIDAndIsAllow(membershipID: number, isAllow: boolean) {
    let url = this.aPIURL + this.controller + '/UpdateItemsPhanQuyenByMembershipIDAndIsAllow';
    const params = new HttpParams()
      .set('membershipID', JSON.stringify(membershipID))
      .set('isAllow', JSON.stringify(isAllow))
    return this.httpClient.get(url, { params });
  }
  updateItemsPhanQuyenByMenuIDAndIsAllow(menuID: number, isAllow: boolean) {
    let url = this.aPIURL + this.controller + '/UpdateItemsPhanQuyenByMenuIDAndIsAllow';
    const params = new HttpParams()
      .set('menuID', JSON.stringify(menuID))
      .set('isAllow', JSON.stringify(isAllow))
    return this.httpClient.get(url, { params });
  }
  deleteItemsByCA() {
    let url = this.aPIURL + this.controller + '/DeleteItemsByCA';
    const params = new HttpParams()      
    return this.httpClient.get(url, { params });
  }
  postFileDinhKem(membershipID: number, title: string, fileToUpload: FileList) {
    let url = this.aPIURL + this.controller + '/PostFileDinhKem';
    const uploadDataMembershipID = JSON.stringify(membershipID);
    const uploadDatatitle = JSON.stringify(title);
    const formUpload: FormData = new FormData();
    formUpload.append('membershipID', uploadDataMembershipID);
    formUpload.append('title', uploadDatatitle);
    if (fileToUpload != null) {
      for (var i = 0; i < fileToUpload.length; i++) {
        formUpload.append("file[]", fileToUpload[i]);
      }
    }
    return this.httpClient.post(url, formUpload);
  }
  postTiepCan(membershipProperty: MembershipProperty, fileToUpload: FileList) {
    let url = this.aPIURL + this.controller + '/PostTiepCan';    
    const formUpload: FormData = new FormData();
    formUpload.append('membershipProperty', JSON.stringify(membershipProperty));    
    if (fileToUpload != null) {
      for (var i = 0; i < fileToUpload.length; i++) {
        formUpload.append("file[]", fileToUpload[i]);
      }
    }
    return this.httpClient.post(url, formUpload);
  }
}
