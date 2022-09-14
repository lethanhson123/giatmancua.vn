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
  selector: 'app-amphieu-yeu-cau-info',
  templateUrl: './amphieu-yeu-cau-info.component.html',
  styleUrls: []
})
export class AMPhieuYeuCauInfoComponent implements OnInit {

  listAM_PhieuYeuCau_ThuocTinh: AM_PhieuYeuCau_ThuocTinh[];
  constructor(public membershipService: MembershipService,
    public aM_PhieuYeuCauService: AM_PhieuYeuCauService, 
    public aM_PhieuYeuCau_ThuocTinhService: AM_PhieuYeuCau_ThuocTinhService,           
    private router: Router) {
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
            this.getAM_PhieuYeuCau_ThuocTinhToList();
          });                    
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
}
