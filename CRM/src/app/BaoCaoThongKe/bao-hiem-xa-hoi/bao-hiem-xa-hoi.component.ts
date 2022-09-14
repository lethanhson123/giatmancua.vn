import { Component, OnInit, ViewChild } from '@angular/core';
import { Dashboard } from 'src/app/shared/dashboard.model';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AppGlobalService } from 'src/app/shared/app-global.service';
import { YearMonth } from 'src/app/shared/YearMonth.model';
import { environment } from 'src/environments/environment';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { DownloadService } from 'src/app/shared/download.service';

@Component({
  selector: 'app-bao-hiem-xa-hoi',
  templateUrl: './bao-hiem-xa-hoi.component.html',
  styleUrls: []
})
export class BaoHiemXaHoiComponent implements OnInit {

  searchString: string = environment.InitializationString;
  productID: number = environment.BHXHID;
  listProduct: Config[];
  listYear: YearMonth[];
  year: number = new Date().getFullYear();
  listDashboard00003DoanhThuHuyen: Dashboard[];
  listDashboard00004DoanhThuHuyen: Dashboard[];
  dataSourceDashboard00003DoanhThuHuyen: MatTableDataSource<any>;
  displayColumnsDashboard00003DoanhThuHuyen: string[] = ['CityName', 'YearSum', 'Thang01', 'Thang02', 'Thang03', 'Thang04', 'Thang05', 'Thang06', 'Thang07', 'Thang08', 'Thang09', 'Thang10', 'Thang11', 'Thang12'];
  @ViewChild(MatSort) sortDashboard00003DoanhThuHuyen: MatSort;
  @ViewChild(MatPaginator) paginatorDashboard00003DoanhThuHuyen: MatPaginator;
  public barChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return Number(tooltipItem.yLabel).toFixed(0).replace(/./g, function (c, i, a) {
            return i > 0 && c !== "." && (a.length - i) % 3 === 0 ? "." + c : c;
          });
        }
      }
    }
  };
  public barChartLabels: Label[] = ['Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04', 'Tháng 05', 'Tháng 06', 'Tháng 07', 'Tháng 08', 'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = {
    afterDatasetsDraw: function (context, easing) {
      var ctx = context.chart.ctx;
      context.data.datasets.forEach(function (dataset) {
        for (var i = 0; i < dataset.data.length; i++) {
          if (dataset.data[i] != 0) {
            var model = dataset._meta[Object.keys(dataset._meta)[0]].data[i]._model;
            var textY = model.y + (dataset.type == "line" ? -3 : 15);
            ctx.font = Chart.helpers.fontString(Chart.defaults.global.defaultFontSize, 'normal', Chart.defaults.global.defaultFontFamily);
            ctx.textAlign = 'start';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = dataset.type == "line" ? "black" : "black";
            ctx.save();
            ctx.translate(model.x - 20, textY - 30);            
            ctx.fillText(dataset.data[i], 0, 0);
            ctx.restore();
          }
        }
      });
    }
  };
  public barChartData: ChartDataSets[] = [];
  public barChartColors: any[] = [
    {
      backgroundColor: ["#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE", "#6FC8CE"]
    }];
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04', 'Tháng 05', 'Tháng 06', 'Tháng 07', 'Tháng 08', 'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  public pieChartData: SingleDataSet = [8.1, 5.6, 10.2, 3.6, 5.9, 1.9, 7.6, 5.7, 8.4, 4.6, 8.1, 9.1];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  
  detailURL: string = environment.DoanhNghiepDetailURL;
  isShowLoading: boolean = false;  
  listMonth: YearMonth[];
  month: number = new Date().getMonth() + 1;  
  listDashboard: Dashboard[];
  dataSourceDashboard: MatTableDataSource<any>;
  displayColumnsDashboard: string[] = ['STT', 'TaxCode', 'FullName', 'CityName', 'Total', 'Year', 'Month', 'ProductCode', 'PaymentCode', 'Address'];
  @ViewChild(MatSort) sortDashboard: MatSort;
  @ViewChild(MatPaginator) paginatorDashboard: MatPaginator;

  constructor(public dashboardService: DashboardService,
    public configService: ConfigService,
    public downloadService: DownloadService,
    public appGlobalService: AppGlobalService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getYearToList();   
    this.getMonthToList();     
    this.asyncDashboard00005DoanhThuHuyenByYearAndProductIDToList();
    this.asyncDashboard00006DoanhThuHuyenByYearAndProductIDToList();
    this.dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToList();
  }
  asyncDashboard00005DoanhThuHuyenByYearAndProductIDToList() {
    this.dashboardService.asyncDashboard00005DoanhThuHuyenByYearAndProductIDToList(this.year, this.productID).then(res => {
      this.dataSourceDashboard00003DoanhThuHuyen = new MatTableDataSource(res as Dashboard[]);
      this.dataSourceDashboard00003DoanhThuHuyen.sort = this.sortDashboard00003DoanhThuHuyen;
    });
  }
  asyncDashboard00006DoanhThuHuyenByYearAndProductIDToList() {
    this.dashboardService.asyncDashboard00006DoanhThuHuyenByYearAndProductIDToList(this.year, this.productID).then(res => {
      this.listDashboard00004DoanhThuHuyen = (res as Dashboard[]);
      let yearSum = [];
      let cityName = [];
      let yearPercent = [];
      this.listDashboard00004DoanhThuHuyen.forEach(item => {
        cityName.push(item.CityName);
        yearSum.push(item.YearSumM);
        yearPercent.push(item.YearPercent);
      });
      this.barChartLabels = cityName;
      this.barChartData = [{ data: yearSum, label: 'Doanh thu (Đơn vị tính: triệu đồng)' }];
      this.pieChartLabels = cityName;
      this.pieChartData = yearPercent;
    });
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
  getProductToList(searchString: string) {
    this.configService.getProductToList().then(res => {
      this.listProduct = (res as Config[]).sort((a, b) => (a.Title > b.Title ? 1 : -1));
      if (searchString.length > 0) {
        this.listProduct = this.listProduct.filter(s => s.Title.includes(searchString));
      }
    });
  }
  onFilterProduct(searchString: string) {
    this.getProductToList(searchString);
  }
  onChangeYear($event) {    
    this.asyncDashboard00005DoanhThuHuyenByYearAndProductIDToList();
    this.asyncDashboard00006DoanhThuHuyenByYearAndProductIDToList();
    this.dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToList();
  }
  onChangeMonth($event) {
    this.dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToList();     
  }
  dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToList() {
    this.isShowLoading = true;
    this.dashboardService.dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToList(this.year, this.month, this.productID).then(res => {
      this.dataSourceDashboard = new MatTableDataSource(res as Dashboard[]);      
      this.dataSourceDashboard.sort = this.sortDashboard;
      this.dataSourceDashboard.paginator = this.paginatorDashboard;
      this.isShowLoading = false;
    });
  }
  onDownloadExcelFile() {
    this.isShowLoading = true;    
    this.downloadService.dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToExcelURL(this.year, this.month, this.productID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }  
  onPrint() {
    this.isShowLoading = true;    
    this.downloadService.dashboard00008DoanhThuChiTietByYearAndMonthAndProductIDToHTMLURL(this.year, this.month, this.productID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}