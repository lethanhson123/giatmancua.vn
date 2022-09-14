import { Component, OnInit, ViewChild } from '@angular/core';
import { Membership } from 'src/app/shared/membership.model';
import { MembershipService } from 'src/app/shared/membership.service';
import { MembershipProperty } from 'src/app/shared/MembershipProperty.model';
import { MembershipPropertyService } from 'src/app/shared/MembershipProperty.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PhanQuyenMenuDetailComponent } from './phan-quyen-menu-detail/phan-quyen-menu-detail.component';

@Component({
  selector: 'app-phan-quyen-menu',
  templateUrl: './phan-quyen-menu.component.html',
  styleUrls: []
})
export class PhanQuyenMenuComponent implements OnInit {

  isAllowAll: boolean = false;
  membershipID: number = environment.InitializationNumber;
  listMembership: Membership[];
  isShowLoading: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'IsAllow', 'ParentName', 'MenuName'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public membershipService: MembershipService,
    public membershipPropertyService: MembershipPropertyService,
    public notificationService: NotificationService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.getMembershipToList();
  }
  getMembershipToList() {
    this.membershipService.getAllNhanVienToList().then(res => {
      this.listMembership = res as Membership[];
    });
  }
  getToList() {
    this.isShowLoading = true;
    this.membershipPropertyService.asyncGetDataTransferPhanQuyenByMembershipIDToList(this.membershipID).then(res => {
      this.membershipPropertyService.list = (res as MembershipProperty[]);
      this.dataSource = new MatTableDataSource(this.membershipPropertyService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }
  onSearchByMembershipID() {
    this.getToList();
  }
  onSave() {
    console.log(this.membershipID);
    console.log(this.isAllowAll);
    this.membershipPropertyService.updateItemsPhanQuyenByMembershipIDAndIsAllow(this.membershipID, this.isAllowAll).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.getToList();
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
      }
    );
  }
  onAdd(ID: number) {
    this.membershipPropertyService.getDataTransferPhanQuyenByID(ID).then(res => {
      this.membershipPropertyService.formData = res as MembershipProperty;
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "80%";
    const dialog = this.dialog.open(PhanQuyenMenuDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getToList();
    });
  }
}
