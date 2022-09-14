import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dich-vu',
  templateUrl: './dich-vu.component.html',
  styleUrls: ['./dich-vu.component.css']
})
export class DichVuComponent implements OnInit {

  detailURL: string = "/DichVu/Info";
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['Title', 'IsWebsite', 'actions'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public configService: ConfigService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getToList();
  }

  getToList() {
    this.configService.getProductByCRMToList().then(res => {
      this.configService.list = res as Config[];
      this.dataSource = new MatTableDataSource(this.configService.list.sort((a, b) => (b.IsWebsite > a.IsWebsite ? 1 : -1)));
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