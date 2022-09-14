import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MembershipPropertyService } from 'src/app/shared/MembershipProperty.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-phan-quyen-menu-detail',
  templateUrl: './phan-quyen-menu-detail.component.html',
  styleUrls: []
})
export class PhanQuyenMenuDetailComponent implements OnInit {

  constructor(public membershipPropertyService: MembershipPropertyService,    
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<PhanQuyenMenuDetailComponent>
  ) {    
  }
  ngOnInit(): void {
  }
  onClose() {
    this.membershipPropertyService.initializationFormData();
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {        
    this.membershipPropertyService.updateItemsPhanQuyenByMenuIDAndIsAllow(form.value.MenuID,form.value.IsAllow).subscribe(
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
