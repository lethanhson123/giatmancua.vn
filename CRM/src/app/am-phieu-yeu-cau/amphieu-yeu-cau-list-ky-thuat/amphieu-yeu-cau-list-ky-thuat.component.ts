import { Component, OnInit } from '@angular/core';
import { AM_PhieuYeuCau } from 'src/app/shared/AM_PhieuYeuCau.model';
import { AM_PhieuYeuCauService } from 'src/app/shared/AM_PhieuYeuCau.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-amphieu-yeu-cau-list-ky-thuat',
  templateUrl: './amphieu-yeu-cau-list-ky-thuat.component.html',
  styleUrls: [],
})
export class AMPhieuYeuCauListKyThuatComponent implements OnInit {
  daGuiCount: number = environment.InitializationNumber;
  daNhanCount: number = environment.InitializationNumber;
  dangXuLyCount: number = environment.InitializationNumber;
  hoanThanhCount: number = environment.InitializationNumber;
  listHoanThanh: AM_PhieuYeuCau[];
  listDangXuLy: AM_PhieuYeuCau[];
  listDaNhan: AM_PhieuYeuCau[];
  listDaGui: AM_PhieuYeuCau[];
  hoanThanhURL: string = environment.AM_PhieuYeuCauHoanThanhURL;
  infoURL: string = environment.AM_PhieuYeuCauInfoURL;
  doanhNghiepDetailURL: string = environment.DoanhNghiepDetailURL;
  constructor(public aM_PhieuYeuCauService: AM_PhieuYeuCauService) {}

  ngOnInit(): void {
    this.initialization();
  }
  initialization() {
    this.aM_PhieuYeuCauService.getCount().then((res) => {
      this.aM_PhieuYeuCauService.formData = res as AM_PhieuYeuCau;
      if (this.aM_PhieuYeuCauService.formData.DaGuiCount > 0) {
        this.daGuiCount = this.aM_PhieuYeuCauService.formData.DaGuiCount;
      }
      if (this.aM_PhieuYeuCauService.formData.DaNhanCount > 0) {
        this.daNhanCount = this.aM_PhieuYeuCauService.formData.DaNhanCount;
      }
      if (this.aM_PhieuYeuCauService.formData.DangXuLyCount > 0) {
        this.dangXuLyCount = this.aM_PhieuYeuCauService.formData.DangXuLyCount;
      }
      if (this.aM_PhieuYeuCauService.formData.HoanThanhCount > 0) {
        this.hoanThanhCount = this.aM_PhieuYeuCauService.formData.HoanThanhCount;
      }
    });
    this.aM_PhieuYeuCauService.getHoanThanhToList().then((res) => {
      this.listHoanThanh = res as AM_PhieuYeuCau[];
    });
    this.aM_PhieuYeuCauService.getDangXuLyToList().then((res) => {
      this.listDangXuLy = res as AM_PhieuYeuCau[];
    });
    this.aM_PhieuYeuCauService.getDaNhanToList().then((res) => {
      this.listDaNhan = res as AM_PhieuYeuCau[];
    });
    this.aM_PhieuYeuCauService.getDaGuiToList().then((res) => {
      this.listDaGui = res as AM_PhieuYeuCau[];
    });
  }  
  onDangXuLy(ID: number) {
    this.aM_PhieuYeuCauService.dangXuLy(ID).then((res) => {
      this.initialization();
    });
  }
  onDaNhan(ID: number) {
    this.aM_PhieuYeuCauService.dangXuLy(ID).then((res) => {
      this.initialization();
    });
  }
}
