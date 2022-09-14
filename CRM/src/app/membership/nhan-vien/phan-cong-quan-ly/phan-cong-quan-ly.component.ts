import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { MembershipProperty } from 'src/app/shared/MembershipProperty.model';
import { MembershipPropertyService } from 'src/app/shared/MembershipProperty.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PhanCongQuanLyDetailComponent } from './phan-cong-quan-ly-detail/phan-cong-quan-ly-detail.component';
import { Membership } from 'src/app/shared/membership.model';
import { MembershipService } from 'src/app/shared/membership.service';

@Component({
  selector: 'app-phan-cong-quan-ly',
  templateUrl: './phan-cong-quan-ly.component.html',
  styleUrls: []
})
export class PhanCongQuanLyComponent implements OnInit {

  provinceTitle: string = environment.ProvinceTitle;
  cityID: number = environment.InitializationNumber;
  membershipID: number = environment.InitializationNumber;
  listCity: Config[];
  isShowLoading: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'CityName', 'WardName'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  listMembership: Membership[];
  constructor(public configService: ConfigService,
    public membershipPropertyService: MembershipPropertyService,
    public notificationService: NotificationService,
    public membershipService: MembershipService,
    private dialog: MatDialog
  ) {
    
  }

  ngOnInit(): void {
    this.getCityToList();
    this.getMembershipToList();
  }
  asyncGetDataTransferPhanCongQuanLyByCityIDToList() {
    this.isShowLoading = true;
    this.membershipPropertyService.asyncGetDataTransferPhanCongQuanLyByCityIDToList(this.cityID).then(res => {
      this.membershipPropertyService.list = (res as MembershipProperty[]);
      this.dataSource = new MatTableDataSource(this.membershipPropertyService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;      
    });
  }
  asyncGetDataTransferPhanCongQuanLyByMembershipIDToList() {
    this.isShowLoading = true;
    this.membershipPropertyService.asyncGetDataTransferPhanCongQuanLyByMembershipIDToList(this.membershipID).then(res => {
      this.membershipPropertyService.list = (res as MembershipProperty[]);
      this.dataSource = new MatTableDataSource(this.membershipPropertyService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;      
    });
  }
  getMembershipToList() {
    this.membershipService.getAllNhanVienToList().then(res => {
      this.listMembership= res as Membership[];      
    });
  }
  getCityToList() {
    this.configService.getCityToList().then(res => {
      this.listCity = (res as Config[]).sort((a, b) => (a.Title > b.Title ? 1 : -1));
    });
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }
  onSearchByCityID() {
    this.asyncGetDataTransferPhanCongQuanLyByCityIDToList();
  }
  onSearchByMembershipID() {
    this.asyncGetDataTransferPhanCongQuanLyByMembershipIDToList();
  }
  onAdd(ID: number) {
    this.membershipPropertyService.getByID(ID).then(res => {
      this.membershipPropertyService.formData = res as MembershipProperty;
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    const dialog = this.dialog.open(PhanCongQuanLyDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.asyncGetDataTransferPhanCongQuanLyByCityIDToList();
    });
  }
  onDelete(ID: number) {
    if (confirm(environment.DeleteConfirm)) {
      this.membershipPropertyService.deleteByID(ID).then(res => {
        let result = res as number;
        if (result == 1) {
          this.asyncGetDataTransferPhanCongQuanLyByCityIDToList();
          this.notificationService.success(environment.DeleteSuccess);
        }
        else {
          this.notificationService.warn(environment.DeleteNotSuccess);
        }
      });
    }
  }
}
