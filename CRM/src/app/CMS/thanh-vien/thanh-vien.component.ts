import { Component, OnInit, ViewChild } from '@angular/core';
import { Membership } from 'src/app/shared/membership.model';
import { MembershipService } from 'src/app/shared/membership.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-thanh-vien',
  templateUrl: './thanh-vien.component.html',
  styleUrls: ['./thanh-vien.component.css']
})
export class ThanhVienComponent implements OnInit {

  detailURL: string = "/ThanhVien/Info";
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['URLImage', 'FullName', 'Description', 'Phone', 'Email', 'IsWebsite', 'actions'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public membershipService: MembershipService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getToList();
  }

  getToList() {
    this.membershipService.getAllNhanVienToList().then(res => {
      this.membershipService.list = res as Membership[];      
      this.dataSource = new MatTableDataSource(this.membershipService.list.sort((a, b) => (a > b ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }  
  onRefresh() {
    this.getToList();
  }  
}