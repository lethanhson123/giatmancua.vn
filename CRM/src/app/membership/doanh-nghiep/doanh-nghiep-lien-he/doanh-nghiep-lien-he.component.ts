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
  selector: 'app-doanh-nghiep-lien-he',
  templateUrl: './doanh-nghiep-lien-he.component.html',
  styleUrls: []
})
export class DoanhNghiepLienHeComponent implements OnInit {

  detailURL: string = environment.DoanhNghiepDetailURL;
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'NguoiXuLyFullName', 'NoiDungLienHe', 'TaxCode', 'FullName'];
  searchString: string = environment.InitializationString;
  isShowLoading: boolean = false;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  provinceTitle: string = environment.ProvinceTitle;
  cityID: number = environment.InitializationNumber;
  wardID: number = environment.InitializationNumber;
  listCity: Config[];
  listWard: Config[];
  isLienHe: boolean = true;
  isGiaHan: boolean = true;
  constructor(public membershipService: MembershipService,
    public configService: ConfigService,
    public appGlobalService: AppGlobalService,
    public downloadService: DownloadService,
    public notificationService: NotificationService
  ) {
    this.getCityToList();
  }
  ngOnInit(): void {
  }
  getCityToList() {
    this.configService.getCityByMembershipIDToList().then(res => {
      this.listCity = res as Config[];
    });
  }
  getWardByCityIDToList() {
    this.configService.getWardByMembershipIDAndCityIDToList(this.cityID).then(res => {
      this.listWard = res as Config[];
    });
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }
  onSearchList() {    
    this.getToList();
  }
  getToList() {
    this.isShowLoading = true;
    this.membershipService.getDoanhNghiepByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToList(this.cityID, this.wardID, this.isLienHe, this.isGiaHan).then(res => {
      this.membershipService.list = res as Membership[];
      this.dataSource = new MatTableDataSource(this.membershipService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onDownloadExcelFile() {
    this.isShowLoading = true;
    this.downloadService.getDoanhNghiepByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToExcelURL(this.cityID, this.wardID, this.isLienHe, this.isGiaHan).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
  onPrint() {
    this.isShowLoading = true;
    this.downloadService.getDoanhNghiepByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToHTMLURL(this.cityID, this.wardID, this.isLienHe, this.isGiaHan).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
  onChangeCity($event) {
    this.getWardByCityIDToList();
  }
}

