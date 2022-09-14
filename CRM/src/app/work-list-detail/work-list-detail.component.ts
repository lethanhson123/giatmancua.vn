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
import { WorkListMembership } from 'src/app/shared/WorkListMembership.model';
import { WorkListMembershipService } from 'src/app/shared/WorkListMembership.service';
import { DownloadService } from 'src/app/shared/download.service';
import { Router, NavigationEnd } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-work-list-detail',
  templateUrl: './work-list-detail.component.html',
  styleUrls: ['./work-list-detail.component.css']
})
export class WorkListDetailComponent implements OnInit {

  detailURL: string = environment.WorkListDetailURL;
  doanhNghiepDetailURL: string = environment.DoanhNghiepDetailURL;
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = [ 'STT', 'TaxCode', 'FullName', 'Phone', 'Address', 'actions'];
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
  provinceID: number = environment.InitializationNumber;  
  cityID: number = environment.InitializationNumber;  
  wardID: number = environment.InitializationNumber;  
  taxCode: string = environment.InitializationString;  
  listCity: Config[];
  listWard: Config[];
  constructor(public membershipService: MembershipService,
    public configService: ConfigService,
    public workListService: WorkListService,
    public workListMembershipService: WorkListMembershipService,
    private router: Router,
    public appGlobalService: AppGlobalService,
    public downloadService: DownloadService,
    public notificationService: NotificationService,
  ) {              
    this.getMembershipToList();    
    this.getProductToList();
    this.getCityToList();
    this.getByIDQueryString();
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
  onChangeCity($event) {
    this.getWardByCityIDToList();
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
  getByIDQueryString() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let IDString = event.url;
        IDString = IDString.split('/')[IDString.split('/').length - 1];
        let ID = parseInt(IDString);
        this.workListService.formData.ID = ID;
        this.workListService.getByID(ID).then(res => {
          this.workListService.formData = res as WorkList;    
          this.getWorkListMembershipByParentIDToList();      
        });
      }
    });
  }
  onSubmit(form: NgForm) {
    this.workListService.add(form.value).subscribe(
      data => {
        if (form.value.ID > 0) {
          this.notificationService.warn(environment.SaveSuccess);
        }
        else {
          let url = this.detailURL + "/" + data;
          this.router.navigateByUrl(url);
        }
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
      }
    );
  }
  getWorkListMembershipByParentIDToList() {
    this.isShowLoading = true;
    this.workListMembershipService.getByParentIDToList(this.workListService.formData.ID).then(res => {
      this.workListMembershipService.list = res as WorkListMembership[];      
      this.dataSource = new MatTableDataSource(this.workListMembershipService.list);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.isShowLoading = false;
    });
  } 
  onInsertByProvinceIDAndCityIDAndWardIDAndTaxCode() {
    if(this.workListService.formData){
      if(this.workListService.formData.ID>0){
        this.isShowLoading = true;
        this.workListMembershipService.insertByProvinceIDAndCityIDAndWardIDAndTaxCode(this.workListService.formData.ID, this.provinceID, this.cityID, this.wardID, this.taxCode).then(res => {
          this.notificationService.warn(environment.SaveSuccess);
          this.isShowLoading = false;
          this.getWorkListMembershipByParentIDToList();    
        });
      }
    }    
  }     
  onDeleteWorkListMembership(ID: number) {
    if (confirm(environment.DeleteConfirm)) {
      this.workListMembershipService.removeByID(ID).then(res => {
        let result = res as number;
        if (result == 1) {
          this.getWorkListMembershipByParentIDToList();
          this.notificationService.success(environment.DeleteSuccess);
        }
        else {
          this.notificationService.warn(environment.DeleteNotSuccess);
        }
      });
    }
  }
  onPrint() {
    this.isShowLoading = true;
    this.downloadService.getWorkListByIDToHTMLURL(this.workListService.formData.ID).then(
      res => {
        window.open(res.toString(), "_blank");
        this.isShowLoading = false;
      }
    );
  } 
}
