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
  selector: 'app-vnpt',
  templateUrl: './vnpt.component.html',
  styleUrls: []
})
export class VnptComponent implements OnInit {

  listURL: string = "/Membership/VNPT";
  detailURL: string = environment.NhanVienDetailURL;
  fileToUpload: File = null;
  listNganHang: Config[];
  constructor(public membershipService: MembershipService,
    public configService: ConfigService,
    public notificationService: NotificationService,
    public appGlobalService: AppGlobalService
  ) {        
    this.getByIDQueryString();
  }

  ngOnInit(): void {
  }    
  getByIDQueryString() {
    this.membershipService.getByID(this.appGlobalService.getVNPTID()).then(res => {
      this.membershipService.formData = res as Membership;
    });
  }
  onSubmit(form: NgForm) {
    if (form.value.ID > 0) {
      this.membershipService.postVNPT(form.value, this.fileToUpload).subscribe(
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
