import { Injectable } from '@angular/core';
import { Membership } from 'src/app/shared/membership.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {
  list: Membership[];
  formData: Membership;
  aPIURL: string = environment.APIURL;
  controller: string = "Membership";

  constructor(private httpClient: HttpClient,
    private appGlobalService: AppGlobalService) {
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
  deleteByID(ID: number) {
    let url = this.aPIURL + this.controller + '/RemoveByID?ID=' + ID;
    return this.httpClient.delete(url).toPromise();
  }
  getByAccountAndPassword(account: string, password: string) {
    let url = this.aPIURL + this.controller + '/GetByAccountAndPassword';
    const params = new HttpParams()
      .set("account", account)
      .set("password", password)
    return this.httpClient.get(url, { params }).toPromise();
  }
  getAllNhanVienToList() {
    let url = this.aPIURL + this.controller + '/GetAllNhanVienToList';
    return this.httpClient.get(url).toPromise();
  }
  getDoanhNghiepToList() {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepToList';
    return this.httpClient.get(url).toPromise();
  }
  getByDoanhNghiepWithTaxCodeIsNullToList() {
    let url = this.aPIURL + this.controller + '/GetByDoanhNghiepWithTaxCodeIsNullToList';
    return this.httpClient.get(url).toPromise();
  }
  getByDoanhNghiepWithMembershipCodeIsNullToList() {
    let url = this.aPIURL + this.controller + '/GetByDoanhNghiepWithMembershipCodeIsNullToList';
    return this.httpClient.get(url).toPromise();
  }
  getDoanhNghiepByProductIDAndCityIDAndWardIDToList(productID: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByProductIDAndCityIDAndWardIDToList';
    const params = new HttpParams()
      .set('productID', JSON.stringify(productID))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepByProductIDListAndCityIDAndWardIDToList(productIDList: string, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByProductIDListAndCityIDAndWardIDToList';
    const params = new HttpParams()
      .set('productIDList', productIDList)
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepKhongSuDungDichVuByProductIDAndCityIDAndWardIDToList(productID: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepKhongSuDungDichVuByProductIDAndCityIDAndWardIDToList';
    const params = new HttpParams()
      .set('productID', JSON.stringify(productID))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepKhongSuDungDichVuByProductIDListAndCityIDAndWardIDToList(productIDList: string, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepKhongSuDungDichVuByProductIDListAndCityIDAndWardIDToList';
    const params = new HttpParams()
      .set('productIDList', productIDList)
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepByProductCountAndCityIDAndWardIDToList(productCount: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByProductCountAndCityIDAndWardIDToList';
    const params = new HttpParams()
      .set('productCount', JSON.stringify(productCount))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCAHetHanByDateEndAndCityIDToList(year: number, month: number, cityID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCAHetHanByDateEndAndCityIDToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('cityID', JSON.stringify(cityID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDToList(year: number, month: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToList(cityID: number, wardID: number, isLienHe: boolean, isGiaHan: boolean) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToList';
    const params = new HttpParams()
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
      .set('isLienHe', JSON.stringify(isLienHe))
      .set('isGiaHan', JSON.stringify(isGiaHan))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDAndProductIDToList(year: number, month: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDAndProductIDToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCATaoMoiByDateBeginAndCityIDAndWardIDAndProductIDToList(year: number, month: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCATaoMoiByDateBeginAndCityIDAndWardIDAndProductIDToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCAGiaHanByCityIDAndWardIDAndProductIDToList(cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCAGiaHanByCityIDAndWardIDAndProductIDToList';
    const params = new HttpParams()      
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCADangHoatDongByDateEndAndCityIDAndWardIDAndProductIDToList(cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCADangHoatDongByDateEndAndCityIDAndWardIDAndProductIDToList';
    const params = new HttpParams()      
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getByParentIDAndTaxCode(taxCode: string) {
    let url = this.aPIURL + this.controller + '/GetByParentIDAndTaxCode';
    const params = new HttpParams()      
      .set('taxCode', taxCode)      
    return this.httpClient.get(url, { params }).toPromise();
  }
  getByProductIDAndActiveToList(productID: number, active: boolean) {
    let url = this.aPIURL + this.controller + '/GetByProductIDAndActiveToList';
    const params = new HttpParams()
      .set('productID', JSON.stringify(productID))
      .set('active', JSON.stringify(active))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getByParentIDAndActiveToList(parentID: number, active: boolean) {
    let url = this.aPIURL + this.controller + '/GetByParentIDAndActiveToList';
    const params = new HttpParams()
      .set('parentID', JSON.stringify(parentID))
      .set('active', JSON.stringify(active))
    return this.httpClient.get(url, { params }).toPromise();
  }
  postDoanhNghiep(formData: Membership) {
    let url = this.aPIURL + this.controller + '/PostDoanhNghiep';
    return this.httpClient.post(url, formData);
  }
  postNhanVien(formData: Membership, fileToUpload: File) {
    formData.NguoiLienHeID = this.appGlobalService.getCookieMembershipID();
    let url = this.aPIURL + this.controller + '/PostNhanVien';
    const uploadData = JSON.stringify(formData);
    const formUpload: FormData = new FormData();
    formUpload.append('data', uploadData);
    if (fileToUpload != null) {
      formUpload.append('file', fileToUpload, fileToUpload.name);
    }
    return this.httpClient.post(url, formUpload);
  }
  postVNPT(formData: Membership, fileToUpload: File) {    
    let url = this.aPIURL + this.controller + '/PostVNPT';
    const uploadData = JSON.stringify(formData);
    const formUpload: FormData = new FormData();
    formUpload.append('data', uploadData);
    if (fileToUpload != null) {
      formUpload.append('file', fileToUpload, fileToUpload.name);
    }
    return this.httpClient.post(url, formUpload);
  }
  postVNPTByCRM(formData: Membership, fileToUpload: File) {    
    let url = this.aPIURL + this.controller + '/PostVNPTByCRM';
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
  postNhanVienByCRM(formData: Membership, fileToUpload: File) {    
    let url = this.aPIURL + this.controller + '/PostNhanVienByCRM';
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
