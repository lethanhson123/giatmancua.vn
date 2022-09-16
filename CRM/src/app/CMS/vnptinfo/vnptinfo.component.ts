import { Component, OnInit, ViewChild } from '@angular/core';

import { Config } from 'src/app/shared/config.model';
import { NgForm } from '@angular/forms';
import { Membership } from 'src/app/shared/membership.model';
import { MembershipService } from 'src/app/shared/membership.service';
import { MembershipAddress } from 'src/app/shared/MembershipAddress.model';
import { MembershipAddressService } from 'src/app/shared/MembershipAddress.service';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-vnptinfo',
  templateUrl: './vnptinfo.component.html',
  styleUrls: ['./vnptinfo.component.css']
})
export class VNPTInfoComponent implements OnInit {

  listURL: string = "/Membership/VNPT";
  detailURL: string = environment.NhanVienDetailURL;
  fileToUpload: File = null;
  listNganHang: Config[];
  membershipAddress: string = "";

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['Address', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    public membershipService: MembershipService,
    public membershipAddressService: MembershipAddressService,
    public configService: ConfigService,
    public notificationService: NotificationService,
    public appGlobalService: AppGlobalService,
    public sanitizer: DomSanitizer,
  ) {
    this.getToList();
    this.getByIDQueryString();
  }

  ngOnInit(): void {
  }
  getToList() {
    this.configService.getNganHangToList().then(res => {
      this.listNganHang = res as Config[];
    });
  }
  getByIDQueryString() {
    this.membershipService.getByID(this.appGlobalService.getVNPTID()).then(res => {
      this.membershipService.formData = res as Membership;
      this.getMembershipAddressToList();
    });
  }
  getMembershipAddressToList() {
    this.membershipAddressService.getAllToList().then(res => {
      this.membershipAddressService.list = res as MembershipAddress[];
      this.dataSource = new MatTableDataSource(this.membershipAddressService.list.sort((a, b) => (a.DateUpdated > b.DateUpdated ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  onSubmit(form: NgForm) {
    if (form.value.ID > 0) {
      this.membershipService.postVNPTByCRM(form.value, this.fileToUpload).subscribe(
        data => {
          if (form.value.ID > 0) {
            this.notificationService.warn(environment.SaveSuccess);
          }
        },
        err => {
          this.notificationService.warn(environment.SaveNotSuccess);
        }
      );
    }
    else {
      this.notificationService.warn(environment.SaveNotSuccess);
    }
  }
  changeImage(files: FileList) {
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.membershipService.formData.URLImage = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
  onGoogleMapPress() {
    this.membershipService.formData.GoogleMapDisplay = "https://www.google.com/maps/d/embed?mid=" + this.membershipService.formData.GoogleMap;
  }
  onMembershipAddressDelete(item: MembershipAddress) {
    if (confirm(environment.DeleteConfirm)) {      
      this.membershipAddressService.removeByID(item.ID).then(
        res => {
          this.getMembershipAddressToList();
          this.notificationService.warn(environment.DeleteSuccess);                              
        },
        err => {
          this.notificationService.warn(environment.DeleteNotSuccess);          
        }
      );
    }
  }
  onMembershipAddressSave() {        
    this.membershipAddressService.formData.Address=this.membershipAddress; 
    this.membershipAddressService.save(this.membershipAddressService.formData).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.getMembershipAddressToList();        
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);        
      }      
    );    
  }
}
