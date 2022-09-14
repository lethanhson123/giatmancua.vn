import { Component, OnInit, ViewChild } from '@angular/core';
import { AppGlobalService } from 'src/app/shared/app-global.service';
import { YearMonth } from 'src/app/shared/YearMonth.model';
import { Dashboard } from 'src/app/shared/dashboard.model';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { DownloadService } from 'src/app/shared/download.service';
@Component({
  selector: 'app-doanh-thu-chi-tiet-theo-thang',
  templateUrl: './doanh-thu-chi-tiet-theo-thang.component.html',
  styleUrls: []
})
export class DoanhThuChiTietTheoThangComponent implements OnInit {

  detailURL: string = environment.DoanhNghiepDetailURL;
  isShowLoading: boolean = false;
  listYear: YearMonth[];
  listMonth: YearMonth[];
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();
  listDashboard: Dashboard[];
  dataSourceDashboard: MatTableDataSource<any>;
  displayColumnsDashboard: string[] = ['STT', 'TaxCode', 'FullName', 'CityName', 'ProductCount', 'Total', 'Address'];
  @ViewChild(MatSort) sortDashboard: MatSort;
  @ViewChild(MatPaginator) paginatorDashboard: MatPaginator;
  constructor(public dashboardService: DashboardService,
    public downloadService: DownloadService,
    public appGlobalService: AppGlobalService
  ) { }

  ngOnInit(): void {
    this.getYearToList();
    this.getMonthToList();
    this.dashboard00007DoanhThuTongHopByYearAndMonthToList();
  }
  getYearToList() {
    this.appGlobalService.getYearToList().then(res => {
      this.listYear = res as YearMonth[];
    });
  }
  getMonthToList() {
    this.appGlobalService.getMonthToList().then(res => {
      this.listMonth = res as YearMonth[];
    });
  }
  onChangeYear($event) {
    this.dashboard00007DoanhThuTongHopByYearAndMonthToList();    
  }
  onChangeMonth($event) {
    this.dashboard00007DoanhThuTongHopByYearAndMonthToList();    
  }
  dashboard00007DoanhThuTongHopByYearAndMonthToList() {
    this.isShowLoading = true;
    this.dashboardService.dashboard00007DoanhThuTongHopByYearAndMonthToList(this.year, this.month).then(res => {
      this.dataSourceDashboard = new MatTableDataSource(res as Dashboard[]);      
      this.dataSourceDashboard.sort = this.sortDashboard;
      this.dataSourceDashboard.paginator = this.paginatorDashboard;
      this.isShowLoading = false;
    });
  }
  onDownloadExcelFile() {
    this.isShowLoading = true;    
    this.downloadService.dashboard00007DoanhThuTongHopByYearAndMonthToExcelURL(this.year, this.month).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }  
  onPrint() {
    this.isShowLoading = true;    
    this.downloadService.dashboard00007DoanhThuTongHopByYearAndMonthToHTMLURL(this.year, this.month).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}
