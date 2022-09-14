import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MembershipProperty } from 'src/app/shared/MembershipProperty.model';
import { MembershipPropertyService } from 'src/app/shared/MembershipProperty.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { ConfigService } from 'src/app/shared/config.service';
import { Config } from 'src/app/shared/config.model';
import { Membership } from 'src/app/shared/membership.model';
import { MembershipService } from 'src/app/shared/membership.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-doanh-nghiep-dich-vu-tiep-can',
  templateUrl: './doanh-nghiep-dich-vu-tiep-can.component.html',
  styleUrls: []
})
export class DoanhNghiepDichVuTiepCanComponent implements OnInit {

  listProduct: Config[];
  listNhanVien: Config[];
  listGoiCuoc: Config[];
  fileToUpload: FileList;
  ID: number = environment.InitializationNumber;
  ProductID: number = environment.InitializationNumber;
  dataSourceFileDinhKem: MatTableDataSource<any>;
  displayColumnsFileDinhKem: string[] = ['actions', 'Title'];
  searchStringFileDinhKem: string = environment.InitializationString;
  @ViewChild(MatSort) sortFileDinhKem: MatSort;

  constructor(public membershipPropertyService: MembershipPropertyService,
    public notificationService: NotificationService,
    public configService: ConfigService,
    public membershipService: MembershipService,
    public dialogRef: MatDialogRef<DoanhNghiepDichVuTiepCanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.ID = data["ID"] as number;
    this.getByID(this.ID);
  }
  ngOnInit(): void {
    this.getProductToList(environment.InitializationString);
    this.getFileDinhKemByCodeAndParentIDToList(this.ID);
    this.getAllNhanVienToList();
  }
  getByID(ID: number) {
    this.membershipPropertyService.getByID(ID).then(res => {
      let membershipProperty = res as MembershipProperty;
      this.getProductSubByParentIDToList(membershipProperty.ProductID);
    });
  }
  getFileDinhKemByCodeAndParentIDToList(parentID: number) {
    this.membershipPropertyService.getFileDinhKemByCodeAndParentIDToList(parentID).then(res => {
      this.membershipPropertyService.list = res as MembershipProperty[];
      this.dataSourceFileDinhKem = new MatTableDataSource(this.membershipPropertyService.list);
      this.dataSourceFileDinhKem.sort = this.sortFileDinhKem;
    });
  }
  getAllNhanVienToList() {
    this.membershipService.getAllNhanVienToList().then(res => {
      this.listNhanVien = res as Membership[];
    });
  }
  getProductToList(searchString: string) {
    this.configService.getProductToList().then(res => {
      this.listProduct = res as Config[];
      if (searchString.length > 0) {
        this.listProduct = this.listProduct.filter(s => s.Title.includes(searchString));
      }
    });
  }
  getProductSubByParentIDToList(parentID: number) {
    this.configService.getProductSubByParentIDToList(parentID).then(res => {
      this.listGoiCuoc = res as Config[];
    });
  }
  onClose() {
    this.membershipPropertyService.initializationFormData();
    this.dialogRef.close();
  }
  onSubmit(form: NgForm) {
    this.membershipPropertyService.postTiepCan(form.value, this.fileToUpload).subscribe(
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
    this.getProductToList(searchString);
  }
  onChangeProductID($event) {
    this.getProductSubByParentIDToList(this.membershipPropertyService.formData.ProductID);
  }
  changeFiles(files: FileList) {
    this.fileToUpload = files;
  }
  onDeleteFileDinhKem(ID: number) {
    if (confirm(environment.DeleteConfirm)) {
      this.membershipPropertyService.deleteByID(ID).then(res => {
        let result = res as number;
        if (result == 1) {
          this.notificationService.success(environment.DeleteSuccess);
          this.getFileDinhKemByCodeAndParentIDToList(this.ID);
        }
        else {
          this.notificationService.warn(environment.DeleteNotSuccess);
        }
      });
    }
  }
}