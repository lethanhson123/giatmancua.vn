import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  aPIURL: string = environment.APIURL;
  controller: string = "Upload";
  constructor(private httpClient: HttpClient) {

  }
  postCAListByExcelFile(fileToUpload: File) {
    let url = this.aPIURL + this.controller + '/PostCAListByExcelFile';
    const formUpload: FormData = new FormData();
    formUpload.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formUpload);
  }
  asyncPostInvoiceListByExcelFile(year: number, month: number, fileToUpload: File) {
    let url = this.aPIURL + this.controller + '/AsyncPostInvoiceListByExcelFile';
    const formUpload: FormData = new FormData();
    formUpload.append('year', JSON.stringify(year));
    formUpload.append('month', JSON.stringify(month));
    formUpload.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formUpload);
  }
  postInvoiceListByExcelFile001(year: number, month: number, fileToUpload: File) {
    let url = this.aPIURL + this.controller + '/PostInvoiceListByExcelFile001';
    const formUpload: FormData = new FormData();
    formUpload.append('year', JSON.stringify(year));
    formUpload.append('month', JSON.stringify(month));
    formUpload.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formUpload);
  }
  postInvoiceListByExcelFile(year: number, month: number, fileToUpload: File) {
    let url = this.aPIURL + this.controller + '/PostInvoiceListByExcelFile';
    const formUpload: FormData = new FormData();
    formUpload.append('year', JSON.stringify(year));
    formUpload.append('month', JSON.stringify(month));
    formUpload.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formUpload);
  }
  postInsertItemsByDoanhThuThangTableAndYearAndMonthByExcelFile(year: number, month: number, fileToUpload: File) {
    let url = this.aPIURL + this.controller + '/PostInsertItemsByDoanhThuThangTableAndYearAndMonthByExcelFile';
    const formUpload: FormData = new FormData();
    formUpload.append('year', JSON.stringify(year));
    formUpload.append('month', JSON.stringify(month));
    formUpload.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formUpload);
  }
  postCustomerListByExcelFile(fileToUpload: File) {
    let url = this.aPIURL + this.controller + '/PostCustomerListByExcelFile';
    const formUpload: FormData = new FormData();
    formUpload.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formUpload);
  }
  postProductListByExcelFile(fileToUpload: File) {
    let url = this.aPIURL + this.controller + '/PostProductListByExcelFile';
    const formUpload: FormData = new FormData();
    formUpload.append('file', fileToUpload, fileToUpload.name);
    return this.httpClient.post(url, formUpload);
  }
}
