import { Component, OnInit } from '@angular/core';
import { Membership } from 'src/app/shared/membership.model';
import { Config } from 'src/app/shared/config.model';
import { NgForm } from '@angular/forms';
import { MembershipService } from 'src/app/shared/membership.service';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Component({
  selector: 'app-thong-tin-ca-nhan',
  templateUrl: './thong-tin-ca-nhan.component.html',
  styleUrls: []
})
export class ThongTinCaNhanComponent implements OnInit {

  listURL: string = "/Membership/NhanVien";
  detailURL: string = environment.NhanVienDetailURL;
  fileToUpload: File = null;
  constructor(public membershipService: MembershipService,
    public configService: ConfigService,
    public notificationService: NotificationService,
    public appGlobalService: AppGlobalService
  ) {
    this.getMembershipTypeToList();
    this.getByIDQueryString();
  }

  ngOnInit(): void {
  }
  getMembershipTypeToList() {
    this.configService.getMembershipTypeToList().then(res => {
      this.configService.list = res as Config[];
    });
  }
  getByIDQueryString() {
    this.membershipService.getByID(this.appGlobalService.getCookieMembershipID()).then(res => {
      this.membershipService.formData = res as Membership;
    });
  }
  onSubmit(form: NgForm) {
    if (form.value.ID > 0) {
      this.membershipService.postNhanVien(form.value, this.fileToUpload).subscribe(
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
      this.membershipService.formData.Image = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
}