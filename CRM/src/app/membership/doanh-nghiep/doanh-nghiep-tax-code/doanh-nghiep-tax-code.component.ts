import { Component, OnInit, ViewChild } from '@angular/core';
import { Membership } from 'src/app/shared/membership.model';
import { MembershipService } from 'src/app/shared/membership.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-doanh-nghiep-tax-code',
  templateUrl: './doanh-nghiep-tax-code.component.html',
  styleUrls: []
})
export class DoanhNghiepTaxCodeComponent implements OnInit {

  detailURL: string = environment.DoanhNghiepDetailURL;
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'TaxCode', 'MembershipCode', 'FullName'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public membershipService: MembershipService,
    public notificationService: NotificationService
  ) { }
  ngOnInit(): void {
    this.getToList();
  }
  getToList() {
    this.membershipService.getByDoanhNghiepWithTaxCodeIsNullToList().then(res => {
      this.membershipService.list = res as Membership[];
      this.dataSource = new MatTableDataSource(this.membershipService.list.sort((a, b) => (a > b ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }
  onDelete(ID: number) {
    if (confirm(environment.DeleteConfirm)) {
      this.membershipService.deleteByID(ID).then(res => {
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
