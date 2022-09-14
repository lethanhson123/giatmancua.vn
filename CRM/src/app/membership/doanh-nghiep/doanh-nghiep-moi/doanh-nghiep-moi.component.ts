import { Component, OnInit, ViewChild } from '@angular/core';
import { Membership } from 'src/app/shared/membership.model';
import { MembershipService } from 'src/app/shared/membership.service';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { DownloadService } from 'src/app/shared/download.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-doanh-nghiep-moi',
  templateUrl: './doanh-nghiep-moi.component.html',
  styleUrls: ['./doanh-nghiep-moi.component.css']
})
export class DoanhNghiepMoiComponent implements OnInit {

  productIDList = new FormControl();
  detailURL: string = environment.DoanhNghiepDetailURL;
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'TaxCode', 'MembershipCode', 'FullName'];
  searchString: string = environment.InitializationString;
  provinceTitle: string = environment.ProvinceTitle;
  productID: number = environment.InitializationNumber;
  cityID: number = environment.InitializationNumber;
  wardID: number = environment.InitializationNumber;
  listCity: Config[];
  listWard: Config[];
  listProduct: Config[];
  isShowLoading: boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public membershipService: MembershipService,
    public configService: ConfigService,
    public downloadService: DownloadService,
    public notificationService: NotificationService
  ) { 
    this.getToList();
  }
  ngOnInit(): void {    
    
  }
  
  
  
  getToList() {
    this.isShowLoading = true;    
    
    this.membershipService.getByParentIDAndActiveToList(environment.DoanhNghiepID, false).then(res => {
      this.membershipService.list = res as Membership[];
      this.dataSource = new MatTableDataSource(this.membershipService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  } 
}