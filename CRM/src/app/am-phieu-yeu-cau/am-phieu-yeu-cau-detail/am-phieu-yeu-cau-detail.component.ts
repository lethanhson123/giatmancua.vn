import { Component, OnInit } from '@angular/core';
import { Membership } from 'src/app/shared/membership.model';
import { Config } from 'src/app/shared/config.model';
import { AM_PhieuYeuCau } from 'src/app/shared/AM_PhieuYeuCau.model';
import { AM_PhieuYeuCau_Detail_ViewModel } from 'src/app/shared/AM_PhieuYeuCau_Detail_ViewModel.model';
import { AM_PhieuYeuCau_ThuocTinh } from 'src/app/shared/AM_PhieuYeuCau_ThuocTinh.model';
import { NgForm } from '@angular/forms';
import { MembershipService } from 'src/app/shared/membership.service';
import { AM_PhieuYeuCauService } from 'src/app/shared/AM_PhieuYeuCau.service';
import { AM_PhieuYeuCau_ThuocTinhService } from 'src/app/shared/AM_PhieuYeuCau_ThuocTinh.service';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-am-phieu-yeu-cau-detail',
  templateUrl: './am-phieu-yeu-cau-detail.component.html',
  styleUrls: []
})
export class AMPhieuYeuCauDetailComponent implements OnInit {

  fileToUpload: FileList;
  listAMHeThong: Config[];
  listAMMauSo: Config[];
  listAMMauHoaDon: Config[];
  listAmNgonNgu: Config[];
  listCustomerType: Config[];
  listNganHang: Config[];
  listProvince: Config[];
  listCity: Config[];
  listWard: Config[];
  listAM_PhieuYeuCau_ThuocTinh: AM_PhieuYeuCau_ThuocTinh[];
  listURL: string = "/AMPhieuYeuCau/DanhSach";
  detailURL: string = environment.AM_PhieuYeuCauDetailURL;
  constructor(public membershipService: MembershipService,
    public aM_PhieuYeuCauService: AM_PhieuYeuCauService,
    public aM_PhieuYeuCau_ThuocTinhService: AM_PhieuYeuCau_ThuocTinhService,
    public notificationService: NotificationService,
    public configService: ConfigService,
    private router: Router) {
    this.getToList();
    this.getByIDQueryString();
  }

  ngOnInit(): void {
  }
  getByIDQueryString() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let IDString = event.url;
        IDString = IDString.split('/')[IDString.split('/').length - 1];
        let ID = parseInt(IDString);
        this.aM_PhieuYeuCauService.getByID(ID).then(res => {
          this.aM_PhieuYeuCauService.formDataViewModel = res as AM_PhieuYeuCau_Detail_ViewModel;
          this.membershipService.getByID(this.aM_PhieuYeuCauService.formDataViewModel.KhachHangID).then(membership => {
            this.membershipService.formData = membership as Membership;
            this.covertMembershipToDataViewModel(this.membershipService.formData);
          });
          this.notificationService.success(environment.SaveSuccess);
          this.getAM_PhieuYeuCau_ThuocTinhToList();
        });
      }
    });
  }
  covertMembershipToDataViewModel(membership: Membership) {
    if (membership.ID > 0) {
      this.aM_PhieuYeuCauService.formDataViewModel.FullName = this.membershipService.formData.FullName;
      this.aM_PhieuYeuCauService.formDataViewModel.MembershipCode = this.membershipService.formData.MembershipCode;
      this.aM_PhieuYeuCauService.formDataViewModel.TaxCode = this.membershipService.formData.TaxCode;
      this.aM_PhieuYeuCauService.formDataViewModel.Phone = this.membershipService.formData.Phone;
      this.aM_PhieuYeuCauService.formDataViewModel.Address = this.membershipService.formData.Address;
      this.aM_PhieuYeuCauService.formDataViewModel.ContactFullName = this.membershipService.formData.ContactFullName;
      this.aM_PhieuYeuCauService.formDataViewModel.ContactPhone = this.membershipService.formData.ContactPhone;
      this.aM_PhieuYeuCauService.formDataViewModel.NganHang_SoTaiKhoan = this.membershipService.formData.NganHang_SoTaiKhoan;
      this.aM_PhieuYeuCauService.formDataViewModel.NganHangID = this.membershipService.formData.NganHangID;
      this.aM_PhieuYeuCauService.formDataViewModel.CategoryID = this.membershipService.formData.CategoryID;
      this.aM_PhieuYeuCauService.formDataViewModel.ProvinceID = this.membershipService.formData.ProvinceID;
      this.aM_PhieuYeuCauService.formDataViewModel.CityID = this.membershipService.formData.CityID;
      this.aM_PhieuYeuCauService.formDataViewModel.WardID = this.membershipService.formData.WardID;
    }
  }
  getAM_PhieuYeuCau_ThuocTinhToList() {
    this.aM_PhieuYeuCau_ThuocTinhService.getByPhieuYeuCauIDAndCodeToList(this.aM_PhieuYeuCauService.formDataViewModel.ID).then(res => {
      this.listAM_PhieuYeuCau_ThuocTinh = res as AM_PhieuYeuCau_ThuocTinh[];
    });
  }
  getToList() {
    this.configService.getAMHeThongToList().then(res => {
      this.listAMHeThong = res as Config[];
    });
    this.configService.getAMMauSoToList().then(res => {
      this.listAMMauSo = res as Config[];
    });
    this.configService.getAMMauHoaDonToList().then(res => {
      this.listAMMauHoaDon = res as Config[];
    });
    this.configService.getAMNgonNguToList().then(res => {
      this.listAmNgonNgu = res as Config[];
    });
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
  }
  changeFiles(files: FileList) {
    this.fileToUpload = files;
  }
  onSubmit(form: NgForm) {
    this.aM_PhieuYeuCauService.postHoaDonDienTu(form.value, this.fileToUpload).subscribe(
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
  onKeyUpTaxCode($event: KeyboardEvent) {
    this.membershipService.getByParentIDAndTaxCode(this.aM_PhieuYeuCauService.formDataViewModel.TaxCode).then(membership => {
      this.membershipService.formData = membership as Membership;
      this.covertMembershipToDataViewModel(this.membershipService.formData);
    });
  }
}
