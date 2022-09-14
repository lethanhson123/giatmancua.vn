import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from 'src/app/shared/config.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loai-phieu-yeu-cau-detail',
  templateUrl: './loai-phieu-yeu-cau-detail.component.html',
  styleUrls: []
})
export class LoaiPhieuYeuCauDetailComponent implements OnInit {

  constructor(public configService: ConfigService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<LoaiPhieuYeuCauDetailComponent>
  ) { }
  ngOnInit(): void {   
  }
  onClose() {
    this.configService.initializationFormData();
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {
    this.configService.postLoaiPhieuYeuCau(form.value).subscribe(
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