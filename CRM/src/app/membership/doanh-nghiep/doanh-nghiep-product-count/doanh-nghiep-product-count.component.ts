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
  selector: 'app-doanh-nghiep-product-count',
  templateUrl: './doanh-nghiep-product-count.component.html',
  styleUrls: []
})
export class DoanhNghiepProductCountComponent implements OnInit {

  productCount: string = "1";
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
  ) { }
  ngOnInit(): void {
    this.getCityToList();
    this.getProductToList(this.searchString);
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
  getProductToList(searchString: string) {
    this.configService.getProductToList().then(res => {
      this.listProduct = (res as Config[]).sort((a, b) => (a.Title > b.Title ? 1 : -1));
      if (searchString.length > 0) {
        this.listProduct = this.listProduct.filter(s => s.Title.includes(searchString));
      }
    });
  }
  getToList() {
    this.isShowLoading = true;
    let productCount = Number(this.productCount);
    this.membershipService.getDoanhNghiepByProductCountAndCityIDAndWardIDToList(productCount, this.cityID, this.wardID).then(res => {
      this.membershipService.list = res as Membership[];
      this.dataSource = new MatTableDataSource(this.membershipService.list.sort((a, b) => (a > b ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }
  onChangeCity($event) {
    this.getWardByCityIDToList();
  }
  onSearchList() {        
    this.getToList();
  }
  onFilterProduct(searchString: string) {
    this.getProductToList(searchString);
  }
  onDownloadExcelFile() {
    this.isShowLoading = true;
    let productCount = Number(this.productCount);
    this.downloadService.getDoanhNghiepByProductCountAndCityIDAndWardIDToExcelURL(productCount, this.cityID, this.wardID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
  onPrint() {
    this.isShowLoading = true;
    let productCount = Number(this.productCount);
    this.downloadService.getDoanhNghiepByProductCountAndCityIDAndWardIDToHTMLURL(productCount, this.cityID, this.wardID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  }
}

