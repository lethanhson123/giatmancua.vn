import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { DownloadService } from 'src/app/shared/download.service';
import { AppGlobalService } from 'src/app/shared/app-global.service';
import { YearMonth } from 'src/app/shared/YearMonth.model';
import { Invoice } from 'src/app/shared/Invoice.model';
import { InvoiceService } from 'src/app/shared/Invoice.service';

@Component({
  selector: 'app-invoice-tim-kiem',
  templateUrl: './invoice-tim-kiem.component.html',
  styleUrls: []
})
export class InvoiceTimKiemComponent implements OnInit {

  detailURL: string = environment.DoanhNghiepDetailURL;
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'TaxCode', 'FullName', 'Total'];
  searchString: string = environment.InitializationString;
  provinceTitle: string = environment.ProvinceTitle;
  cityID: number = environment.InitializationNumber;
  wardID: number = environment.InitializationNumber;
  listCity: Config[];
  listWard: Config[];
  listYear: YearMonth[];
  listMonth: YearMonth[];
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();
  isShowLoading: boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public invoiceService: InvoiceService,
    public configService: ConfigService,
    public downloadService: DownloadService,
    public appGlobalService: AppGlobalService,
    public notificationService: NotificationService
  ) { }
  ngOnInit(): void {
    this.getCityToList();
    this.getYearToList();
    this.getMonthToList();
  }
  getCityToList() {
    this.configService.getCityByMembershipIDToList().then(res => {
      this.listCity = (res as Config[]).sort((a, b) => (a.Title > b.Title ? 1 : -1));
    });
  }
  getWardByCityIDToList() {
    this.configService.getWardByMembershipIDAndCityIDToList(this.cityID).then(res => {
      this.listWard = (res as Config[]).sort((a, b) => (a.Title > b.Title ? 1 : -1));
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
  getToList() {
    this.isShowLoading = true;
    this.invoiceService.asyncGetDataTransferByYearAndMonthAndCityIDAndWardID001ToList(this.year, this.month, this.cityID, this.wardID).then(res => {
      this.invoiceService.list = res as Invoice[];
      this.dataSource = new MatTableDataSource(this.invoiceService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }
  onChangeCity($event) {
    this.getWardByCityIDToList();
  }
  onSearchList() {
    this.getToList();
  }
  onPrint(ID: number) {
    this.isShowLoading = true;
    this.downloadService.getInvoiceByIDToHTMLURL(ID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  } 
}