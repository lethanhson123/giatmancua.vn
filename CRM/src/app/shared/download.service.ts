import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  aPIURL: string = environment.APIURL;
  controller: string = "Download";
  constructor(private httpClient: HttpClient) {
  }
  dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToExcelURL(year: number, month: number, productID: number) {
    let url = this.aPIURL + this.controller + '/Dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToExcelURL';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('productID', JSON.stringify(productID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToHTMLURL(year: number, month: number, productID: number) {
    let url = this.aPIURL + this.controller + '/Dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToHTMLURL';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('productID', JSON.stringify(productID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  dashboard00007DoanhThuTongHopByYearAndMonthToExcelURL(year: number, month: number) {
    let url = this.aPIURL + this.controller + '/Dashboard00007DoanhThuTongHopByYearAndMonthToExcelURL';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
    return this.httpClient.get(url, { params }).toPromise();
  }
  dashboard00007DoanhThuTongHopByYearAndMonthToHTMLURL(year: number, month: number) {
    let url = this.aPIURL + this.controller + '/Dashboard00007DoanhThuTongHopByYearAndMonthToHTMLURL';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
    return this.httpClient.get(url, { params }).toPromise();
  }
  dashboard00009DoanhThuMoiByYearAndMonthAndActiveToExcelURL(year: number, month: number, active: boolean) {
    let url = this.aPIURL + this.controller + '/Dashboard00009DoanhThuMoiByYearAndMonthAndActiveToExcelURL';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('active', JSON.stringify(active))
    return this.httpClient.get(url, { params }).toPromise();
  }
  dashboard00009DoanhThuMoiByYearAndMonthAndActiveToHTMLURL(year: number, month: number, active: boolean) {
    let url = this.aPIURL + this.controller + '/Dashboard00009DoanhThuMoiByYearAndMonthAndActiveToHTMLURL';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('active', JSON.stringify(active))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepKhongSuDungDichVuByProductIDAndCityIDAndWardIDToExcelURL(productID: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepKhongSuDungDichVuByProductIDAndCityIDAndWardIDToExcelURL';
    const params = new HttpParams()
      .set('productID', JSON.stringify(productID))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepKhongSuDungDichVuByProductIDAndCityIDAndWardIDToHTMLURL(productID: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepKhongSuDungDichVuByProductIDAndCityIDAndWardIDToHTMLURL';
    const params = new HttpParams()
      .set('productID', JSON.stringify(productID))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepKhongSuDungDichVuByProductIDListAndCityIDAndWardIDToExcelURL(productIDList: string, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepKhongSuDungDichVuByProductIDListAndCityIDAndWardIDToExcelURL';
    const params = new HttpParams()
      .set('productIDList', productIDList)
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepKhongSuDungDichVuByProductIDListAndCityIDAndWardIDToHTMLURL(productIDList: string, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepKhongSuDungDichVuByProductIDListAndCityIDAndWardIDToHTMLURL';
    const params = new HttpParams()
      .set('productIDList', productIDList)
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepByProductIDAndCityIDAndWardIDToExcelURL(productID: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByProductIDAndCityIDAndWardIDToExcelURL';
    const params = new HttpParams()
      .set('productID', JSON.stringify(productID))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepByProductIDAndCityIDAndWardIDToHTMLURL(productID: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByProductIDAndCityIDAndWardIDToHTMLURL';
    const params = new HttpParams()
      .set('productID', JSON.stringify(productID))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepByProductIDListAndCityIDAndWardIDToExcelURL(productIDList: string, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByProductIDListAndCityIDAndWardIDToExcelURL';
    const params = new HttpParams()
      .set('productIDList', productIDList)
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepByProductIDListAndCityIDAndWardIDToHTMLURL(productIDList: string, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByProductIDListAndCityIDAndWardIDToHTMLURL';
    const params = new HttpParams()
      .set('productIDList', productIDList)
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepByProductCountAndCityIDAndWardIDToExcelURL(productCount: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByProductCountAndCityIDAndWardIDToExcelURL';
    const params = new HttpParams()
      .set('productCount', JSON.stringify(productCount))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepByProductCountAndCityIDAndWardIDToHTMLURL(productCount: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByProductCountAndCityIDAndWardIDToHTMLURL';
    const params = new HttpParams()
      .set('productCount', JSON.stringify(productCount))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDAndProductIDToExcelURL(year: number, month: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDAndProductIDToExcelURL';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDAndProductIDToHTMLURL(year: number, month: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDAndProductIDToHTMLURL';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCATaoMoiByDateBeginAndCityIDAndWardIDAndProductIDToExcelURL(year: number, month: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCATaoMoiByDateBeginAndCityIDAndWardIDAndProductIDToExcelURL';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCATaoMoiByDateBeginAndCityIDAndWardIDAndProductIDToHTMLURL(year: number, month: number, cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCATaoMoiByDateBeginAndCityIDAndWardIDAndProductIDToHTMLURL';
    const params = new HttpParams()
      .set('year', JSON.stringify(year))
      .set('month', JSON.stringify(month))
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCAGiaHanByCityIDAndWardIDAndProductIDToExcelURL(cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCAGiaHanByCityIDAndWardIDAndProductIDToExcelURL';
    const params = new HttpParams()
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCAGiaHanByCityIDAndWardIDAndProductIDToHTMLURL(cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCAGiaHanByCityIDAndWardIDAndProductIDToHTMLURL';
    const params = new HttpParams()
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCADangHoatDongByCityIDAndWardIDAndProductIDToExcelURL(cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepCADangHoatDongByCityIDAndWardIDAndProductIDToExcelURL';
    const params = new HttpParams()
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepCADangHoatDongByCityIDAndWardIDAndProductIDToHTMLURL(cityID: number, wardID: number) {
    let url = this.aPIURL + this.controller + '/getDoanhNghiepCADangHoatDongByCityIDAndWardIDAndProductIDToHTMLURL';
    const params = new HttpParams()
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getInvoiceByIDToHTMLURL(ID: number) {
    let url = this.aPIURL + this.controller + '/GetInvoiceByIDToHTMLURL';
    const params = new HttpParams()
      .set('ID', JSON.stringify(ID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getWorkListByIDToHTMLURL(ID: number) {
    let url = this.aPIURL + this.controller + '/GetWorkListByIDToHTMLURL';
    const params = new HttpParams()
      .set('ID', JSON.stringify(ID))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToExcelURL(cityID: number, wardID: number, isLienHe: boolean, isGiaHan: boolean) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToExcelURL';
    const params = new HttpParams()
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
      .set('isLienHe', JSON.stringify(isLienHe))
      .set('isGiaHan', JSON.stringify(isGiaHan))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getDoanhNghiepByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToHTMLURL(cityID: number, wardID: number, isLienHe: boolean, isGiaHan: boolean) {
    let url = this.aPIURL + this.controller + '/GetDoanhNghiepByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToHTMLURL';
    const params = new HttpParams()
      .set('cityID', JSON.stringify(cityID))
      .set('wardID', JSON.stringify(wardID))
      .set('isLienHe', JSON.stringify(isLienHe))
      .set('isGiaHan', JSON.stringify(isGiaHan))
    return this.httpClient.get(url, { params }).toPromise();
  }
  getHopDongCAByMembershipPropertyIDToHTMLURL(membershipPropertyID: number) {
    let url = this.aPIURL + this.controller + '/GetHopDongCAByMembershipPropertyIDToHTMLURL';
    const params = new HttpParams()
      .set('membershipPropertyID', JSON.stringify(membershipPropertyID))
    return this.httpClient.get(url, { params }).toPromise();
  }
}
