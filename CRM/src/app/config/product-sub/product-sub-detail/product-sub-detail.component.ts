import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfigService } from 'src/app/shared/config.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { Config } from 'src/app/shared/config.model';

@Component({
  selector: 'app-product-sub-detail',
  templateUrl: './product-sub-detail.component.html',
  styleUrls: []
})
export class ProductSubDetailComponent implements OnInit {

  listProduct: Config[];
  searchString: string = environment.InitializationString;
  constructor(public configService: ConfigService,
    public notificationService: NotificationService,
    public dialogRef: MatDialogRef<ProductSubDetailComponent>
  ) { }
  ngOnInit(): void {
    this.getToList(this.searchString);
  }
  getToList(searchString: string) {
    this.configService.getProductToList().then(res => {
      this.listProduct = res as Config[];
      if (searchString.length > 0) {
        this.listProduct = this.listProduct.filter(s => s.Title.includes(searchString));
      }
    });
  }
  onClose() {
    this.configService.initializationFormData();
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {
    this.configService.postProductSub(form.value).subscribe(
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
  onFilterProduct(searchString: string) {
    this.getToList(searchString);
  }
}