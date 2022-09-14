import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  aPIURL: string=environment.APIURL;
  controller: string = "Dashboard";
  constructor(private httpClient: HttpClient) {    
  }
  asyncDashboard00000DoanhThuTongHopToList() {
    let url = this.aPIURL + this.controller + '/AsyncDashboard00000DoanhThuTongHopToList';   
    return this.httpClient.get(url).toPromise();
  }
  asyncDashboard00001DoanhThuTongHopByYearToList(year: number) {
    let url = this.aPIURL + this.controller + '/AsyncDashboard00001DoanhThuTongHopByYearToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))      
    return this.httpClient.get(url, { params }).toPromise();
  } 
  asyncDashboard00002DoanhThuTongHopByYearBeginAndYearEnd() {
    let url = this.aPIURL + this.controller + '/AsyncDashboard00002DoanhThuTongHopByYearBeginAndYearEnd';   
    return this.httpClient.get(url).toPromise();
  }
  asyncDashboard00003DoanhThuHuyenByYearToList(year: number) {
    let url = this.aPIURL + this.controller + '/AsyncDashboard00003DoanhThuHuyenByYearToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))      
    return this.httpClient.get(url, { params }).toPromise();
  } 
  asyncDashboard00004DoanhThuHuyenByYearToList(year: number) {
    let url = this.aPIURL + this.controller + '/AsyncDashboard00004DoanhThuHuyenByYearToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))      
    return this.httpClient.get(url, { params }).toPromise();
  } 
  asyncDashboard00005DoanhThuHuyenByYearAndProductIDToList(year: number, productID: number) {
    let url = this.aPIURL + this.controller + '/AsyncDashboard00005DoanhThuHuyenByYearAndProductIDToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))      
      .set('productID', JSON.stringify(productID))      
    return this.httpClient.get(url, { params }).toPromise();
  } 
  asyncDashboard00006DoanhThuHuyenByYearAndProductIDToList(year: number, productID: number) {
    let url = this.aPIURL + this.controller + '/AsyncDashboard00006DoanhThuHuyenByYearAndProductIDToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))     
      .set('productID', JSON.stringify(productID))       
    return this.httpClient.get(url, { params }).toPromise();
  } 
  dashboard00007DoanhThuTongHopByYearAndMonthToList(year: number, month: number) {
    let url = this.aPIURL + this.controller + '/Dashboard00007DoanhThuTongHopByYearAndMonthToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))     
      .set('month', JSON.stringify(month))       
    return this.httpClient.get(url, { params }).toPromise();
  } 
  dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToList(year: number, month: number,  productID: number) {
    let url = this.aPIURL + this.controller + '/Dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))     
      .set('month', JSON.stringify(month))       
      .set('productID', JSON.stringify(productID))       
    return this.httpClient.get(url, { params }).toPromise();
  } 
  dashboard00009DoanhThuMoiByYearAndMonthAndActiveToList(year: number, month: number,  active: boolean) {
    let url = this.aPIURL + this.controller + '/Dashboard00009DoanhThuMoiByYearAndMonthAndActiveToList';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))     
      .set('month', JSON.stringify(month))       
      .set('active', JSON.stringify(active))       
    return this.httpClient.get(url, { params }).toPromise();
  } 
  dashboard0001() {
    let url = this.aPIURL + this.controller + '/Dashboard0001';    
    return this.httpClient.get(url).toPromise();
  } 
  dashboard0005() {
    let url = this.aPIURL + this.controller + '/Dashboard0005';    
    return this.httpClient.get(url).toPromise();
  } 
}
