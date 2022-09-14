import { Component, OnInit } from '@angular/core';
import { Membership } from 'src/app/shared/membership.model';
import { Config } from 'src/app/shared/config.model';
import { NgForm } from '@angular/forms';
import { MembershipService } from 'src/app/shared/membership.service';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-thanh-vien-info',
  templateUrl: './thanh-vien-info.component.html',
  styleUrls: ['./thanh-vien-info.component.css']
})
export class ThanhVienInfoComponent implements OnInit {

  listURL: string = "/Membership/NhanVien";
  detailURL: string = environment.NhanVienDetailURL;
  fileToUpload: File = null;
  constructor(public membershipService: MembershipService,
    public configService: ConfigService,
    public notificationService: NotificationService,
    private router: Router
  ) {    
    this.getByIDQueryString();
  }

  ngOnInit(): void {
  }
    
  getByIDQueryString() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let IDString = event.url;
        IDString = IDString.split('/')[IDString.split('/').length - 1];
        let ID = parseInt(IDString);
        this.membershipService.getByID(ID).then(res => {
          this.membershipService.formData = res as Membership;
          this.notificationService.success(environment.SaveSuccess);
        });
      }
    });
  }
  onSubmit(form: NgForm) {
    this.membershipService.postNhanVienByCRM(form.value, this.fileToUpload).subscribe(
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
  changeImage(files: FileList) {
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.membershipService.formData.URLImage = event.target.result;
    };
    reader.readAsDataURL(this.fileToUpload);
  }
}