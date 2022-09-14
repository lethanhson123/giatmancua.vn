import { Component, OnInit, ViewChild } from '@angular/core';
import { AM_PhieuYeuCau } from 'src/app/shared/AM_PhieuYeuCau.model';
import { AM_PhieuYeuCauService } from 'src/app/shared/AM_PhieuYeuCau.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-am-phieu-yeu-cau-danh-sach',
  templateUrl: './am-phieu-yeu-cau-danh-sach.component.html',
  styleUrls: []
})
export class AMPhieuYeuCauDanhSachComponent implements OnInit {

  infoURL: string = environment.AM_PhieuYeuCauInfoURL;
  detailURL: string = environment.AM_PhieuYeuCauDetailURL;
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'DaGui', 'DaNhan', 'DangXuLy', 'HoanThanh', 'KhachHang', 'TieuDe', 'NgayTao'];
  searchString: string = environment.InitializationString;  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public aM_PhieuYeuCauService: AM_PhieuYeuCauService,
    public notificationService: NotificationService
  ) { }
  ngOnInit(): void {   
    this.getToList();
  }  
  getToList() {   
    this.aM_PhieuYeuCauService.getByNguoiTaoIDToList().then(res => {
      this.aM_PhieuYeuCauService.list = res as AM_PhieuYeuCau[];
      this.dataSource = new MatTableDataSource(this.aM_PhieuYeuCauService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;      
    });
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }  
  onDelete(ID: number) {
    if (confirm(environment.DeleteConfirm)) {
      this.aM_PhieuYeuCauService.deleteByID(ID).then(res => {
        let result = res as number;
        if (result == 1) {
          this.getToList();
          this.notificationService.success(environment.DeleteSuccess);
        }
        else {
          this.notificationService.warn(environment.DeleteNotSuccess);
        }
      });
    }
  }
}
