import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MembershipPropertyService } from 'src/app/shared/MembershipProperty.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { Membership } from 'src/app/shared/membership.model';
import { MembershipService } from 'src/app/shared/membership.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-phan-cong-quan-ly-detail',
  templateUrl: './phan-cong-quan-ly-detail.component.html',
  styleUrls: []
})
export class PhanCongQuanLyDetailComponent implements OnInit {

  wardIDList = new FormControl();
  provinceTitle: string = environment.ProvinceTitle;
  cityID: number = environment.InitializationNumber;
  listCity: Config[];
  listWard: Config[];
  listMembership: Membership[];
  constructor(public configService: ConfigService,
    public membershipPropertyService: MembershipPropertyService,
    public membershipService: MembershipService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<PhanCongQuanLyDetailComponent>
  ) {
    this.getCityToList();
    this.getMembershipToList();
  }

  ngOnInit(): void {
  }
  getMembershipToList() {
    this.membershipService.getAllNhanVienToList().then(res => {
      this.listMembership = res as Membership[];
    });
  }
  getCityToList() {
    this.configService.getCityToList().then(res => {
      this.listCity = (res as Config[]).sort((a, b) => (a.Title > b.Title ? 1 : -1));
    });
  }
  getWardByCityIDToList() {
    this.configService.getWardByParentIDAndCodeToList(this.membershipPropertyService.formData.CityID).then(res => {
      this.listWard = (res as Config[]).sort((a, b) => (a.Title > b.Title ? 1 : -1));
    });
  }
  onChangeCity($event) {
    this.getWardByCityIDToList();
  }
  onClose() {
    this.membershipPropertyService.initializationFormData();
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {
    let wardIDList = environment.InitializationString;
    for (let i = 0; i < 100; i++) {
      if (this.wardIDList[i] != null) {
        wardIDList = wardIDList + this.wardIDList[i] + ';';
      }
    }
    this.membershipPropertyService.formData.Note = wardIDList;    
    this.membershipPropertyService.postPhanCongQuanLyByWardList(this.membershipPropertyService.formData).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.onClose();
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.onClose();
      }
    );
  }
}
