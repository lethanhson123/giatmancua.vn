import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MembershipPropertyService } from 'src/app/shared/MembershipProperty.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/shared/config.service';
import { Config } from 'src/app/shared/config.model';

@Component({
  selector: 'app-doanh-nghiep-nguoi-lien-he',
  templateUrl: './doanh-nghiep-nguoi-lien-he.component.html',
  styleUrls: []
})
export class DoanhNghiepNguoiLienHeComponent implements OnInit {

  listChucVu: Config[];
  constructor(public membershipPropertyService: MembershipPropertyService,
    public notificationService: NotificationService,
    public configService: ConfigService,
    public dialogRef: MatDialogRef<DoanhNghiepNguoiLienHeComponent>
  ) { }
  ngOnInit(): void {       
    this.getChucVuToList();
  }
  getChucVuToList() {
    this.configService.getChucVuToList().then(res => {
      this.listChucVu = res as Config[];      
    });
  }
  onClose() {
    this.membershipPropertyService.initializationFormData();
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {        
    this.membershipPropertyService.postNguoiLienHe(form.value).subscribe(
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