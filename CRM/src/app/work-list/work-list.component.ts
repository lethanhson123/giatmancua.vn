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
import { WorkList } from 'src/app/shared/WorkList.model';
import { WorkListService } from 'src/app/shared/WorkList.service';
import { DownloadService } from 'src/app/shared/download.service';

@Component({
  selector: 'app-work-list',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {

  detailURL: string = environment.WorkListDetailURL;
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['DateBegin', 'DateEnd', 'Description', 'FullName', 'ProductName', 'IsComplete', 'actions'];
  searchString: string = environment.InitializationString;
  listYear: YearMonth[];
  listMonth: YearMonth[];
  month: number = new Date().getMonth() + 1;
  year: number = new Date().getFullYear();
  isShowLoading: boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  provinceTitle: string = environment.ProvinceTitle;
  membershipID: number = environment.InitializationNumber;  
  productID: number = environment.CAID;    
  constructor(public membershipService: MembershipService,
    public configService: ConfigService,
    public workListService: WorkListService,
    public appGlobalService: AppGlobalService,
    public downloadService: DownloadService,
    public notificationService: NotificationService
  ) {    
    this.getYearToList();    
    this.getMembershipToList();    
    this.getProductToList();
  }
  ngOnInit(): void {
    this.onSearchList();
  }
  
  getYearToList() {
    this.appGlobalService.getYearToList().then(res => {
      this.listYear = res as YearMonth[];
    });
  }    
  getMembershipToList() {
    this.membershipService.getAllNhanVienToList().then(res => {
      this.membershipService.list = res as Membership[];      
    });
  }
  getProductToList() {
    this.configService.getProductToList().then(res => {
      this.configService.list = res as Config[];     
    });
  }
  onSearchList() {
    this.getToList();
  }
  getToList() {
    this.isShowLoading = true;
    this.workListService.getByYearAndMembershipIDAndProductIDToList(this.year, this.membershipID, this.productID).then(res => {
      this.workListService.list = res as WorkList[];      
      this.dataSource = new MatTableDataSource(this.workListService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  } 
}
