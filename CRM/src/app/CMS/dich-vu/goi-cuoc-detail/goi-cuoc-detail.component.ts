import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from 'src/app/shared/config.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { Config } from 'src/app/shared/config.model';

@Component({
  selector: 'app-goi-cuoc-detail',
  templateUrl: './goi-cuoc-detail.component.html',
  styleUrls: ['./goi-cuoc-detail.component.css']
})
export class GoiCuocDetailComponent implements OnInit {
  
  listProduct: Config[];
  searchString: string = environment.InitializationString;
  constructor(public configService: ConfigService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<GoiCuocDetailComponent>
  ) { }
  ngOnInit(): void {  
  }

  onClose() {
    this.configService.initializationFormDataSub();
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.configService.postProductSubByCRM(form.value).subscribe(
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
