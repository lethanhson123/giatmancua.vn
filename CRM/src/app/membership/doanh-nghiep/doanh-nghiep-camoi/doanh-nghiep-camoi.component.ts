import { Component, OnInit, ViewChild } from '@angular/core';
import { Membership } from 'src/app/shared/membership.model';
import { MembershipService } from 'src/app/shared/membership.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';
import { YearMonth } from 'src/app/shared/YearMonth.model';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { DownloadService } from 'src/app/shared/download.service';

@Component({
  selector: 'app-doanh-nghiep-camoi',
  templateUrl: './doanh-nghiep-camoi.component.html',
  styleUrls: ['./doanh-nghiep-camoi.component.css']
})
export class DoanhNghiepCAMoiComponent implements OnInit {

  detailURL: string = environment.DoanhNghiepDetailURL;
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'TaxCode', 'FullName'];
  searchString: string = environment.InitializationString;
  listYear: YearMonth[];
  listMonth: YearMonth[];
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();
  isShowLoading: boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  provinceTitle: string = environment.ProvinceTitle;
  cityID: number = environment.InitializationNumber;
  listCity: Config[];
  wardID: number = environment.InitializationNumber;
  listWard: Config[];
  constructor(public membershipService: MembershipService,
    public configService: ConfigService,
    public appGlobalService: AppGlobalService,
    public downloadService: DownloadService,
    public notificationService: NotificationService
  ) {
    this.getToList();
  }
  ngOnInit(): void {
  }

  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }
  onSearchList() {
    this.getToList();
  }
  getToList() {
    this.isShowLoading = true;
    this.membershipService.getByProductIDAndActiveToList(environment.CAID, false).then(res => {
      this.membershipService.list = res as Membership[];
      this.dataSource = new MatTableDataSource(this.membershipService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }  
}
