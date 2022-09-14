import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UploadService } from 'src/app/shared/upload.service';
import { InvoiceService } from 'src/app/shared/Invoice.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { AppGlobalService } from 'src/app/shared/app-global.service';
import { YearMonth } from 'src/app/shared/YearMonth.model';
import { MembershipPropertyService } from 'src/app/shared/MembershipProperty.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: []
})
export class UploadComponent implements OnInit {

  fileToUploadInvoice: File = null;
  fileToUploadCustomer: File = null;
  fileToUploadProduct: File = null;
  fileToUploadCADangKy: File = null;
  invoiceURL: string = environment.APIOnlineURL + environment.Download + "/" + environment.InvoiceExcelFileName;
  customerURL: string = environment.APIOnlineURL + environment.Download + "/" + environment.CustomerExcelFileName;
  productURL: string = environment.APIOnlineURL + environment.Download + "/" + environment.ProductExcelFileName;
  cADangKyURL: string = environment.APIOnlineURL + environment.Download + "/" + environment.CADangKyExcelFileName;
  listYear: YearMonth[];
  listMonth: YearMonth[];
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();
  monthDelete: number = new Date().getMonth() + 1;
  yearDelete: number = new Date().getFullYear();
  isShowLoading: boolean = false;
  constructor(public uploadService: UploadService,
    public invoiceService: InvoiceService,
    public membershipPropertyService: MembershipPropertyService,
    public notificationService: NotificationService,
    public appGlobalService: AppGlobalService) {
    this.getYearToList();
    this.getMonthToList();
  }

  ngOnInit(): void {
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
  onChangeInvoice(files: FileList) {
    this.fileToUploadInvoice = files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUploadInvoice);
  }
  onChangeCustomer(files: FileList) {
    this.fileToUploadCustomer = files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUploadCustomer);
  }
  onChangeProduct(files: FileList) {
    this.fileToUploadProduct = files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUploadProduct);
  }
  onChangeCADangKy(files: FileList) {
    this.fileToUploadCADangKy = files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUploadCADangKy);
  }
  onSubmitInvoice() {
    this.isShowLoading = true;
    this.uploadService.postInvoiceListByExcelFile001(this.year, this.month, this.fileToUploadInvoice).subscribe(
      data => {
        this.isShowLoading = false;
        this.notificationService.success(environment.UploadSuccess);
      },
      err => {
        this.isShowLoading = false;
        this.notificationService.warn(environment.UploadNotSuccess);
      }
    );
  }
  onDeleteInvoice() {
    this.isShowLoading = true;
    this.invoiceService.deleteByYearAndMonth(this.yearDelete, this.monthDelete).subscribe(
      data => {
        this.isShowLoading = false;
        this.notificationService.success(environment.DeleteSuccess);
      },
      err => {
        this.isShowLoading = false;
        this.notificationService.warn(environment.DeleteNotSuccess);
      }
    );
  }
  onSubmitCustomer() {
    this.isShowLoading = true;
    this.uploadService.postCustomerListByExcelFile(this.fileToUploadCustomer).subscribe(
      data => {
        this.isShowLoading = false;
        this.notificationService.success(environment.UploadSuccess);
      },
      err => {
        this.isShowLoading = false;
        this.notificationService.warn(environment.UploadNotSuccess);
      }
    );
  }
  onSubmitProduct() {
    this.isShowLoading = true;
    this.uploadService.postProductListByExcelFile(this.fileToUploadProduct).subscribe(
      data => {
        this.isShowLoading = false;
        this.notificationService.success(environment.UploadSuccess);
      },
      err => {
        this.isShowLoading = false;
        this.notificationService.warn(environment.UploadNotSuccess);
      }
    );
  }
  onSubmitCADangKy() {
    this.isShowLoading = true;
    this.uploadService.postCAListByExcelFile(this.fileToUploadCADangKy).subscribe(
      data => {
        this.isShowLoading = false;
        this.notificationService.success(environment.UploadSuccess);
      },
      err => {
        this.isShowLoading = false;
        this.notificationService.warn(environment.UploadNotSuccess);
      }
    );
  }
  onDeleteCA() {
    this.isShowLoading = true;
    this.membershipPropertyService.deleteItemsByCA().subscribe(
      data => {
        this.isShowLoading = false;
        this.notificationService.success(environment.DeleteSuccess);
      },
      err => {
        this.isShowLoading = false;
        this.notificationService.warn(environment.DeleteNotSuccess);
      }
    );
  }
}
