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
  selector: 'app-doanh-thu-moi-theo-thang',
  templateUrl: './doanh-thu-moi-theo-thang.component.html',
  styleUrls: ['./doanh-thu-moi-theo-thang.component.css']
})
export class DoanhThuMoiTheoThangComponent implements OnInit {

  detailURL: string = environment.DoanhNghiepDetailURL;
  isShowLoading: boolean = false;
  listYear: YearMonth[];
  listMonth: YearMonth[];
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();
  active: boolean = false;
  listDashboard: Dashboard[];
  dataSourceDashboard: MatTableDataSource<any>;
  displayColumnsDashboard: string[] = ['STT', 'TaxCode', 'FullName', 'CityName', 'Total'];
  @ViewChild(MatSort) sortDashboard: MatSort;
  @ViewChild(MatPaginator) paginatorDashboard: MatPaginator;
  constructor(public dashboardService: DashboardService,
    public downloadService: DownloadService,
    public appGlobalService: AppGlobalService
  ) { }

  ngOnInit(): void {
    this.getYearToList();
    this.getMonthToList();
    this.dashboard00009DoanhThuMoiByYearAndMonthAndActiveToList();
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
    this.dashboard00009DoanhThuMoiByYearAndMonthAndActiveToList();
  }
  onChangeMonth($event) {
    this.dashboard00009DoanhThuMoiByYearAndMonthAndActiveToList();
  }
  dashboard00009DoanhThuMoiByYearAndMonthAndActiveToList() {
    this.isShowLoading = true;
    this.dashboardService.dashboard00009DoanhThuMoiByYearAndMonthAndActiveToList(this.year, this.month, this.active).then(res => {
      this.dataSourceDashboard = new MatTableDataSource(res as Dashboard[]);
      this.dataSourceDashboard.sort = this.sortDashboard;
      this.dataSourceDashboard.paginator = this.paginatorDashboard;
      this.isShowLoading = false;
    });
  }
  onDownloadExcelFile() {
    this.isShowLoading = true;
    this.downloadService.dashboard00009DoanhThuMoiByYearAndMonthAndActiveToExcelURL(this.year, this.month, this.active).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
  onPrint() {
    this.isShowLoading = true;
    this.downloadService.dashboard00009DoanhThuMoiByYearAndMonthAndActiveToHTMLURL(this.year, this.month, this.active).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}
