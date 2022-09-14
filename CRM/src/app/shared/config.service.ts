import { Injectable } from '@angular/core';
import { Config } from 'src/app/shared/config.model';
import { HttpParams, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  list: Config[];
  formData: Config;
  formDataSub: Config;
  aPIURL: string = environment.APIURL;
  controller: string = "Config";

  constructor(private httpClient: HttpClient,
    private appGlobalService: AppGlobalService) {
    this.initializationFormData();
  }
  initializationFormData() {
    this.formData = {
      ID: 0     
    }   
  }
  initializationFormDataSub() {
    this.formDataSub = {
      ID: 0     
    }
  }
  getByParentIDToList(parentID: number) {
    let url = this.aPIURL + this.controller + '/GetByParentIDToList?ParentID=' + parentID;
    return this.httpClient.get(url).toPromise();
  }
  getByID(ID: number) {
    let url = this.aPIURL + this.controller + '/GetByID?ID=' + ID;
    return this.httpClient.get(url).toPromise();
  }
  deleteByID(ID: number) {
    let url = this.aPIURL + this.controller + '/RemoveByID?ID=' + ID;
    return this.httpClient.delete(url).toPromise();
  }
  deleteItemsMenuByIDAndCode(ID: number) {
    let url = this.aPIURL + this.controller + '/DeleteItemsMenuByIDAndCode?ID=' + ID;
    return this.httpClient.delete(url).toPromise();
  }
  getProvinceToList() {
    let url = this.aPIURL + this.controller + '/GetProvinceToList';
    return this.httpClient.get(url).toPromise();
  }
  getCityToList() {
    let url = this.aPIURL + this.controller + '/GetCityToList';
    return this.httpClient.get(url).toPromise();
  }
  getWardToList() {
    let url = this.aPIURL + this.controller + '/GetWardToList';
    return this.httpClient.get(url).toPromise();
  }
  getMenuLeftToList() {
    let url = this.aPIURL + this.controller + '/GetMenuLeftToList';
    return this.httpClient.get(url).toPromise();
  }
  getMembershipTypeToList() {
    let url = this.aPIURL + this.controller + '/GetMembershipTypeToList';
    return this.httpClient.get(url).toPromise();
  }
  getNganHangToList() {
    let url = this.aPIURL + this.controller + '/GetNganHangToList';
    return this.httpClient.get(url).toPromise();
  }
  getProductByCRMToList() {
    let url = this.aPIURL + this.controller + '/GetProductByCRMToList';
    return this.httpClient.get(url).toPromise();
  }
  getProductToList() {
    let url = this.aPIURL + this.controller + '/GetProductToList';
    return this.httpClient.get(url).toPromise();
  }
  getLoaiBaiVietToList() {
    let url = this.aPIURL + this.controller + '/GetLoaiBaiVietToList';
    return this.httpClient.get(url).toPromise();
  }
  getLoaiPhieuYeuCauToList() {
    let url = this.aPIURL + this.controller + '/GetLoaiPhieuYeuCauToList';
    return this.httpClient.get(url).toPromise();
  }
  getUnitToList() {
    let url = this.aPIURL + this.controller + '/GetUnitToList';
    return this.httpClient.get(url).toPromise();
  }
  getCustomerTypeToList() {
    let url = this.aPIURL + this.controller + '/GetCustomerTypeToList';
    return this.httpClient.get(url).toPromise();
  }
  getAMNgonNguToList() {
    let url = this.aPIURL + this.controller + '/GetAMNgonNguToList';
    return this.httpClient.get(url).toPromise();
  }
  getAMMauHoaDonToList() {
    let url = this.aPIURL + this.controller + '/GetAMMauHoaDonToList';
    return this.httpClient.get(url).toPromise();
  }
  getAMMauSoToList() {
    let url = this.aPIURL + this.controller + '/GetAMMauSoToList';
    return this.httpClient.get(url).toPromise();
  }
  getAMHeThongToList() {
    let url = this.aPIURL + this.controller + '/GetAMHeThongToList';
    return this.httpClient.get(url).toPromise();
  }  
  getChucVuToList() {
    let url = this.aPIURL + this.controller + '/GetChucVuToList';
    return this.httpClient.get(url).toPromise();
  }  
  getProductGroupToList() {
    let url = this.aPIURL + this.controller + '/GetProductGroupToList';
    return this.httpClient.get(url).toPromise();
  }    
  getWardByParentIDAndCodeToList(parentID: number) {
    let url = this.aPIURL + this.controller + '/GetWardByParentIDAndCodeToList';
    const params = new HttpParams()
      .set('parentID', JSON.stringify(parentID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getMenuLeftByPhanQuyenToList(membershipID: number) {
    let url = this.aPIURL + this.controller + '/GetMenuLeftByPhanQuyenToList';
    const params = new HttpParams()
    .set('membershipID', JSON.stringify(membershipID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getCityByMembershipIDToList() {
    let url = this.aPIURL + this.controller + '/GetCityByMembershipIDToList';
    const params = new HttpParams()
    .set('membershipID', JSON.stringify(this.appGlobalService.getCookieMembershipID()))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getWardByMembershipIDAndCityIDToList(cityID: number) {
    let url = this.aPIURL + this.controller + '/GetWardByMembershipIDAndCityIDToList';
    const params = new HttpParams()
    .set('membershipID', JSON.stringify(this.appGlobalService.getCookieMembershipID()))
    .set('cityID', JSON.stringify(cityID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getProductSubByParentIDToList(parentID: number) {
    let url = this.aPIURL + this.controller + '/GetProductSubByParentIDToList';
    const params = new HttpParams()    
    .set('parentID', JSON.stringify(parentID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  postProvince(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostProvince';
    return this.httpClient.post(url, formData);
  }
  postCity(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostCity';
    return this.httpClient.post(url, formData);
  }
  postWard(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostWard';
    return this.httpClient.post(url, formData);
  }
  postMenuLeft(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostMenuLeft';
    return this.httpClient.post(url, formData);
  }
  postMembershipType(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostMembershipType';
    return this.httpClient.post(url, formData);
  }
  postNganHang(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostNganHang';
    return this.httpClient.post(url, formData);
  }
  postProduct(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostProduct';
    return this.httpClient.post(url, formData);
  }
  postProductByCRM(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostProductByCRM';
    return this.httpClient.post(url, formData);
  }
  postLoaiBaiViet(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostLoaiBaiViet';
    return this.httpClient.post(url, formData);
  }
  postLoaiPhieuYeuCau(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostLoaiPhieuYeuCau';
    return this.httpClient.post(url, formData);
  }
  postUnit(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostUnit';
    return this.httpClient.post(url, formData);
  }
  postCustomerType(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostCustomerType';
    return this.httpClient.post(url, formData);
  }
  postAMNgonNgu(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostAMNgonNgu';
    return this.httpClient.post(url, formData);
  }
  postAMMauHoaDon(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostAMMauHoaDon';
    return this.httpClient.post(url, formData);
  }
  postAMMauSo(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostAMMauSo';
    return this.httpClient.post(url, formData);
  }
  postAMHeThong(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostAMHeThong';
    return this.httpClient.post(url, formData);
  }
  postChucVu(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostChucVu';
    return this.httpClient.post(url, formData);
  }
  postProductSub(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostProductSub';
    return this.httpClient.post(url, formData);
  }
  postProductSubByCRM(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostProductSubByCRM';
    return this.httpClient.post(url, formData);
  }
  postProductGroup(formData: Config) {
    let url = this.aPIURL + this.controller + '/PostProductGroup';
    return this.httpClient.post(url, formData);
  }
}
