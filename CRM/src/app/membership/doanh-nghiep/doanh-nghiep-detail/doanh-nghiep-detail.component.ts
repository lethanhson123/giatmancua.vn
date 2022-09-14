import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Membership } from 'src/app/shared/membership.model';
import { Config } from 'src/app/shared/config.model';
import { MembershipProperty } from 'src/app/shared/MembershipProperty.model';
import { NgForm } from '@angular/forms';
import { MembershipService } from 'src/app/shared/membership.service';
import { MembershipPropertyService } from 'src/app/shared/MembershipProperty.service';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Invoice } from 'src/app/shared/Invoice.model';
import { InvoiceService } from 'src/app/shared/Invoice.service';
import { InvoiceProperty } from 'src/app/shared/InvoiceProperty.model';
import { InvoicePropertyService } from 'src/app/shared/InvoiceProperty.service';
import { DownloadService } from 'src/app/shared/download.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DoanhNghiepNguoiLienHeComponent } from './doanh-nghiep-nguoi-lien-he/doanh-nghiep-nguoi-lien-he.component';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { DoanhNghiepDichVuTiepCanComponent } from './doanh-nghiep-dich-vu-tiep-can/doanh-nghiep-dich-vu-tiep-can.component';
import { AppGlobalService } from 'src/app/shared/app-global.service';
import { YearMonth } from 'src/app/shared/YearMonth.model';

@Component({
  selector: 'app-doanh-nghiep-detail',
  templateUrl: './doanh-nghiep-detail.component.html',
  styleUrls: []
})
export class DoanhNghiepDetailComponent implements OnInit {

  title: string = environment.InitializationString;
  listURL: string = "/Membership/DoanhNghiepTimKiem";
  detailURL: string = environment.InitializationString;
  fileToUpload: FileList;
  listCustomerType: Config[];
  listNganHang: Config[];
  listProvince: Config[];
  listCity: Config[];
  listWard: Config[];
  listNhanVien: Membership[];
  listInvoice: Invoice[];
  isShowLoading: boolean = false;

  listYear: YearMonth[];
  listMonth: YearMonth[];
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();

  productID: number = environment.InitializationNumber;
  listProduct: Config[];

  invoiceID: number = environment.InitializationNumber;

  dataSourceNguoiLienHe: MatTableDataSource<any>;
  displayColumnsNguoiLienHe: string[] = ['actions', 'ChucVuName', 'FullName', 'Phone', 'Email', 'GioiTinh', 'NgaySinh'];
  @ViewChild(MatSort) sortNguoiLienHe: MatSort;

  dataSourceDichVuTiepCan: MatTableDataSource<any>;
  displayColumnsDichVuTiepCan: string[] = ['actions', 'ProductName', 'GoiCuocName', 'GoiCuocGiaCuoc', 'NhanVienThucHienFullName', 'Note'];
  @ViewChild(MatSort) sortDichVuTiepCan: MatSort;

  dataSourceDichVuPhatTrien: MatTableDataSource<any>;
  displayColumnsDichVuPhatTrien: string[] = ['ProductName', 'GoiCuocName', 'GoiCuocGiaCuoc', 'NhanVienThucHienFullName', 'Note', 'DateContract'];
  @ViewChild(MatSort) sortDichVuPhatTrien: MatSort;

  dataSourceDichVuDangSuDung: MatTableDataSource<any>;
  displayColumnsDichVuDangSuDung: string[] = ['STT', 'ProductName', 'PaymentCode', 'ProductCode', 'Total', 'Year'];
  @ViewChild(MatSort) sortDichVuDangSuDung: MatSort;

  dataSourceDichVuDangSuDungCount: MatTableDataSource<any>;
  displayColumnsDichVuDangSuDungCount: string[] = ['STT', 'ProductName', 'ProductCount', 'Total'];
  @ViewChild(MatSort) sortDichVuDangSuDungCount: MatSort;



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
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [];
  public barChartColors: any[] = [
    {
      backgroundColor: "#6FC8CE"
    }];

  constructor(public membershipService: MembershipService,
    public configService: ConfigService,
    public notificationService: NotificationService,
    public membershipPropertyService: MembershipPropertyService,
    public invoiceService: InvoiceService,
    public invoicePropertyService: InvoicePropertyService,
    public downloadService: DownloadService,
    private dialog: MatDialog,
    public appGlobalService: AppGlobalService,
    private router: Router
  ) {
    this.getToList();
    this.getByIDQueryString();

  }

  ngOnInit(): void {
    this.getYearToList();
    this.getMonthToList();
  }
  getToList() {
    this.configService.getCustomerTypeToList().then(res => {
      this.listCustomerType = res as Config[];
    });
    this.configService.getNganHangToList().then(res => {
      this.listNganHang = res as Config[];
    });
    this.configService.getProvinceToList().then(res => {
      this.listProvince = res as Config[];
    });
    this.configService.getCityToList().then(res => {
      this.listCity = res as Config[];
    });
    this.configService.getWardToList().then(res => {
      this.listWard = res as Config[];
    });
    this.membershipService.getAllNhanVienToList().then(res => {
      this.listNhanVien = res as Membership[];
    });
  }
  getByIDQueryString() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let IDString = event.url;
        IDString = IDString.split('/')[IDString.split('/').length - 1];
        let ID = parseInt(IDString);
        this.membershipService.formData.ID = ID;
        this.membershipService.getByID(ID).then(res => {
          this.membershipService.formData = res as Membership;
          this.getDataTransferNguoiLienHeByMembershipIDAndCodeToList();
          this.getDataTransferTiepCanByMembershipIDAndCodeToList();
          this.getDataTransferPhatTrienByMembershipIDAndCodeToList();
          this.getDataTransferByMembershipIDAndYearAndMonthToList();
          this.getDataTransferCountByMembershipIDAndYearAndMonthToList();
          this.getDataTransferProductDistinctByMembershipIDAndCodeToList();
          this.getByMembershipIDAndProductIDToList();
        });
      }
    });
  }
  getDataTransferNguoiLienHeByMembershipIDAndCodeToList() {
    this.membershipPropertyService.getDataTransferNguoiLienHeByMembershipIDAndCodeToList(this.membershipService.formData.ID).then(res => {
      this.membershipPropertyService.list = res as MembershipProperty[];
      this.dataSourceNguoiLienHe = new MatTableDataSource(this.membershipPropertyService.list);
      this.dataSourceNguoiLienHe.sort = this.sortNguoiLienHe;
    });
  }
  getDataTransferTiepCanByMembershipIDAndCodeToList() {
    this.membershipPropertyService.getDataTransferTiepCanByMembershipIDAndCodeToList(this.membershipService.formData.ID).then(res => {
      this.membershipPropertyService.list = res as MembershipProperty[];
      this.dataSourceDichVuTiepCan = new MatTableDataSource(this.membershipPropertyService.list);
      this.dataSourceDichVuTiepCan.sort = this.sortDichVuTiepCan;
    });
  }
  getDataTransferPhatTrienByMembershipIDAndCodeToList() {
    this.membershipPropertyService.getDataTransferPhatTrienByMembershipIDAndCodeToList(this.membershipService.formData.ID).then(res => {
      this.membershipPropertyService.list = res as MembershipProperty[];
      this.dataSourceDichVuPhatTrien = new MatTableDataSource(this.membershipPropertyService.list);
      this.dataSourceDichVuPhatTrien.sort = this.sortDichVuPhatTrien;
    });
  }
  getDataTransferByMembershipIDAndYearAndMonthToList() {
    this.invoicePropertyService.getDataTransferByMembershipIDAndYearAndMonthToList(this.membershipService.formData.ID, this.year, this.month).then(res => {
      this.invoicePropertyService.list = res as InvoiceProperty[];
      this.dataSourceDichVuDangSuDung = new MatTableDataSource(this.invoicePropertyService.list);
      this.dataSourceDichVuDangSuDung.sort = this.sortDichVuDangSuDung;
      if (this.invoicePropertyService.list.length > 0) {
        this.invoiceID = this.invoicePropertyService.list[0].InvoiceID;
      }
    });
  }
  getDataTransferCountByMembershipIDAndYearAndMonthToList() {
    this.invoicePropertyService.getDataTransferCountByMembershipIDAndYearAndMonthToList(this.membershipService.formData.ID, this.year, this.month).then(res => {
      this.invoicePropertyService.list = res as InvoiceProperty[];
      this.dataSourceDichVuDangSuDungCount = new MatTableDataSource(this.invoicePropertyService.list);
      this.dataSourceDichVuDangSuDungCount.sort = this.sortDichVuDangSuDungCount;
    });
  }
  getDataTransferProductDistinctByMembershipIDAndCodeToList() {
    this.membershipPropertyService.getDataTransferProductDistinctByMembershipIDAndCodeToList(this.membershipService.formData.ID).then(res => {
      this.listProduct = res as MembershipProperty[];
    });
  }
  getByMembershipIDAndProductIDToList() {
    this.invoiceService.getByMembershipIDAndProductIDToList(this.membershipService.formData.ID, this.productID).then(res => {
      this.invoiceService.list = res as Invoice[];
      let total = [];
      this.barChartLabels = [];
      this.invoiceService.list.forEach(item => {
        total.push(item.Total);
        this.barChartLabels.push(item.Note);
      });
      this.barChartData = [
        { data: total, label: 'Bar - Doanh thu (Đơn vị tính: đồng)' },
        { data: total, label: 'Line - Doanh thu (Đơn vị tính: đồng)', type: 'line', fill: false }
      ];
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
  onChangeYear($event) {
    this.getDataTransferByMembershipIDAndYearAndMonthToList();
    this.getDataTransferCountByMembershipIDAndYearAndMonthToList();
  }
  onChangeMonth($event) {
    this.getDataTransferByMembershipIDAndYearAndMonthToList();
    this.getDataTransferCountByMembershipIDAndYearAndMonthToList();
  }
  onSubmit(form: NgForm) {
    this.membershipService.postDoanhNghiep(form.value).subscribe(
      data => {
        if (form.value.ID > 0) {
          this.notificationService.warn(environment.SaveSuccess);
        }
        else {
          let url = this.detailURL + "/" + data;
          this.router.navigateByUrl(url);
        }
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
      }
    );
  }
  onAddNguoiLienHe(ID: number) {
    this.membershipPropertyService.getByID(ID).then(res => {
      this.membershipPropertyService.formData = res as MembershipProperty;
      if (this.membershipPropertyService.formData.ID == environment.InitializationNumber) {
        this.membershipPropertyService.formData.MembershipID = this.membershipService.formData.ID;
        this.membershipPropertyService.formData.NgaySinh = new Date();
      }
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;
    const dialog = this.dialog.open(DoanhNghiepNguoiLienHeComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getDataTransferNguoiLienHeByMembershipIDAndCodeToList();
    });
  }
  onDeleteNguoiLienHe(ID: number) {
    if (confirm(environment.DeleteConfirm)) {
      this.membershipPropertyService.deleteByID(ID).then(res => {
        let result = res as number;
        if (result == 1) {
          this.getDataTransferNguoiLienHeByMembershipIDAndCodeToList();
          this.notificationService.success(environment.DeleteSuccess);
        }
        else {
          this.notificationService.warn(environment.DeleteNotSuccess);
        }
      });
    }
  }
  onChangeProductID($event) {
    this.getByMembershipIDAndProductIDToList();
  }
  onAddDichVuTiepCan(ID: number) {
    this.membershipPropertyService.getByID(ID).then(res => {
      this.membershipPropertyService.formData = res as MembershipProperty;
      if (this.membershipPropertyService.formData.ID == environment.InitializationNumber) {
        this.membershipPropertyService.formData.MembershipID = this.membershipService.formData.ID;
      }
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;
    dialogConfig.data = { ID: ID };
    const dialog = this.dialog.open(DoanhNghiepDichVuTiepCanComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getDataTransferTiepCanByMembershipIDAndCodeToList();
    });
  }
  onDeleteDichVuTiepCan(ID: number) {
    if (confirm(environment.DeleteConfirm)) {
      this.membershipPropertyService.deleteByID(ID).then(res => {
        let result = res as number;
        if (result == 1) {
          this.getDataTransferTiepCanByMembershipIDAndCodeToList();
          this.notificationService.success(environment.DeleteSuccess);
        }
        else {
          this.notificationService.warn(environment.DeleteNotSuccess);
        }
      });
    }
  }
  onPrint() {
    this.isShowLoading = true;
    this.downloadService.getInvoiceByIDToHTMLURL(this.invoiceID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
  onDownloadCanvas(event) {
    var anchor = event.target;
    anchor.href = (<HTMLCanvasElement>document.getElementById('DoanhThuTongHop')).toDataURL();
    anchor.download = "DoanhThuTongHop_" + this.membershipService.formData.FullName + "_" + this.membershipService.formData.TaxCode + ".png";
  }
  onPrintHopDongCA(membershipPropertyID: number) {
    this.isShowLoading = true;
    this.downloadService.getHopDongCAByMembershipPropertyIDToHTMLURL(membershipPropertyID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }


}