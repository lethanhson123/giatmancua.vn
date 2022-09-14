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

@Component({
  selector: 'app-doanh-thu-theo-huyen',
  templateUrl: './doanh-thu-theo-huyen.component.html',
  styleUrls: []
})
export class DoanhThuTheoHuyenComponent implements OnInit {

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
  constructor(public dashboardService: DashboardService,
    public appGlobalService: AppGlobalService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getYearToList();
    this.asyncDashboard00003DoanhThuHuyenByYearToList();
    this.asyncDashboard00004DoanhThuHuyenByYearToList();
  }
  asyncDashboard00003DoanhThuHuyenByYearToList() {
    this.dashboardService.asyncDashboard00003DoanhThuHuyenByYearToList(this.year).then(res => {
      this.dataSourceDashboard00003DoanhThuHuyen = new MatTableDataSource(res as Dashboard[]);
      this.dataSourceDashboard00003DoanhThuHuyen.sort = this.sortDashboard00003DoanhThuHuyen;
    });
  }
  asyncDashboard00004DoanhThuHuyenByYearToList() {
    this.dashboardService.asyncDashboard00004DoanhThuHuyenByYearToList(this.year).then(res => {
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
  onChangeYear($event) {
    this.asyncDashboard00003DoanhThuHuyenByYearToList();
    this.asyncDashboard00004DoanhThuHuyenByYearToList();
  }
}