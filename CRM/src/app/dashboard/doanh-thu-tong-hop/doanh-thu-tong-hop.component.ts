import { Component, OnInit, ViewChild } from '@angular/core';
import { Dashboard } from 'src/app/shared/dashboard.model';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ChartOptions, ChartType, ChartDataSets, Chart } from 'chart.js';
import { Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AppGlobalService } from 'src/app/shared/app-global.service';
import { YearMonth } from 'src/app/shared/YearMonth.model';

@Component({
  selector: 'app-doanh-thu-tong-hop',
  templateUrl: './doanh-thu-tong-hop.component.html',
  styleUrls: []
})
export class DoanhThuTongHopComponent implements OnInit {

  listYear: YearMonth[];
  year: number = new Date().getFullYear();
  listDashboard00000DoanhThuTongHop: Dashboard[];
  listDashboard00001DoanhThuTongHop: Dashboard[];
  listDashboard00002DoanhThuTongHop: Dashboard[];
  dataSourceDashboard00000DoanhThuTongHop: MatTableDataSource<any>;
  displayColumnsDashboard00000DoanhThuTongHop: string[] = ['Year', 'YearSum', 'Thang01', 'Thang02', 'Thang03', 'Thang04', 'Thang05', 'Thang06', 'Thang07', 'Thang08', 'Thang09', 'Thang10', 'Thang11', 'Thang12'];
  @ViewChild(MatSort) sortDashboard00000DoanhThuTongHop: MatSort;
  @ViewChild(MatPaginator) paginatorDashboard00000DoanhThuTongHop: MatPaginator;

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

  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: '2020' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: '2021' },
    { data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], label: '2022' },
  ];
  public lineChartLabels: Label[] = ['Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04', 'Tháng 05', 'Tháng 06', 'Tháng 07', 'Tháng 08', 'Tháng 09', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: any[] = [
    {
      borderColor: 'pink',
      backgroundColor: 'transparent',
    },
    {
      borderColor: 'blue',
      backgroundColor: 'transparent',
    },
    {
      borderColor: 'green',
      backgroundColor: 'transparent',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor(public dashboardService: DashboardService,
    public appGlobalService: AppGlobalService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.getYearToList();
    this.asyncDashboard00000DoanhThuTongHopToList();
    this.asyncDashboard00001DoanhThuTongHopByYearToList();
    this.asyncDashboard00002DoanhThuTongHopByYearBeginAndYearEnd();
  }
  asyncDashboard00000DoanhThuTongHopToList() {
    this.dashboardService.asyncDashboard00000DoanhThuTongHopToList().then(res => {
      this.dataSourceDashboard00000DoanhThuTongHop = new MatTableDataSource(res as Dashboard[]);
      this.dataSourceDashboard00000DoanhThuTongHop.sort = this.sortDashboard00000DoanhThuTongHop;
    });
  }
  asyncDashboard00001DoanhThuTongHopByYearToList() {
    this.dashboardService.asyncDashboard00001DoanhThuTongHopByYearToList(this.year).then(res => {
      this.listDashboard00001DoanhThuTongHop = res as Dashboard[];
      let monthSum = [];
      let monthPercent = [];
      this.listDashboard00001DoanhThuTongHop.forEach(item => {
        monthSum.push(item.MonthSumM);
        monthPercent.push(item.MonthPercent);
      });
      this.barChartData = [{ data: monthSum, label: 'Doanh thu (Đơn vị tính: triệu đồng)' }];
      this.pieChartData = monthPercent;
    });
  }
  asyncDashboard00002DoanhThuTongHopByYearBeginAndYearEnd() {
    this.dashboardService.asyncDashboard00002DoanhThuTongHopByYearBeginAndYearEnd().then(res => {
      this.listDashboard00002DoanhThuTongHop = res as Dashboard[];
      let monthSum01 = [];
      let monthSum02 = [];
      let monthSum03 = [];
      let year01 = 0;
      let year02 = 0;
      let year03 = 0;
      let index = 0;
      this.listDashboard00002DoanhThuTongHop.forEach(item => {
        index = index + 1;
        if ((index > 0) && (index < 13)) {
          year01=item.Year;
          monthSum01.push(item.MonthSumM);
        }
        if ((index > 12) && (index < 25)) {
          year02=item.Year;
          monthSum02.push(item.MonthSumM);
        }
        if ((index > 24) && (index < 37)) {
          year03=item.Year;
          monthSum03.push(item.MonthSumM);
        }
      });    
      this.lineChartData = [
        { data: monthSum01, label: year01.toString() },
        { data: monthSum02, label: year02.toString() },
        { data: monthSum03, label: year03.toString() },
      ];
    });
  }
  getYearToList() {
    this.appGlobalService.getYearToList().then(res => {
      this.listYear = res as YearMonth[];
    });
  }
  onChangeYear($event) {
    this.asyncDashboard00001DoanhThuTongHopByYearToList();
  }
}
