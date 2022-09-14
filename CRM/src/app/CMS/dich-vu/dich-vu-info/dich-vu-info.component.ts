import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { GoiCuocDetailComponent } from '../goi-cuoc-detail/goi-cuoc-detail.component';

@Component({
  selector: 'app-dich-vu-info',
  templateUrl: './dich-vu-info.component.html',
  styleUrls: ['./dich-vu-info.component.css']
})
export class DichVuInfoComponent implements OnInit {

  listURL: string = "/Membership/NhanVien";
  detailURL: string = environment.NhanVienDetailURL;
  fileToUpload: File = null;
  parentID: number = environment.InitializationNumber;
  listProduct: Config[];
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['Title', 'GiaCuoc', 'Token', 'TongTien', 'IsWebsite', 'actions'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public configService: ConfigService,
    public notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    
    this.getByIDQueryString();
  }

  ngOnInit(): void {
  }
  
  getProductSubByParentIDToList() {
    this.configService.getProductSubByParentIDToList(this.configService.formData.ID).then(res => {
      this.configService.list = res as Config[];
      this.dataSource = new MatTableDataSource(this.configService.list.sort((a, b) => (b.IsWebsite > a.IsWebsite ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  onRefresh() {
    this.getProductSubByParentIDToList();
  }  

  getByIDQueryString() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let IDString = event.url;
        IDString = IDString.split('/')[IDString.split('/').length - 1];
        let ID = parseInt(IDString);
        this.configService.getByID(ID).then(res => {
          this.configService.formData = res as Config;
          this.getProductSubByParentIDToList();
          this.notificationService.success(environment.SaveSuccess);
        });
      }
    });
  }
  onSubmit(form: NgForm) {    
    this.configService.postProductByCRM(form.value).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);        
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);        
      }
    );    
  }  
  onAdd(ID: number) {  
    this.configService.getByID(ID).then(res => {
      this.configService.formDataSub = res as Config;
      if (this.configService.formDataSub.ID == environment.InitializationNumber) {
        this.configService.formDataSub.ParentID = this.configService.formData.ID;
        this.configService.formDataSub.GiaCuoc = environment.InitializationNumber;
        this.configService.formDataSub.Token = environment.InitializationNumber;
        this.configService.formDataSub.TongTien = environment.InitializationNumber;
      }
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;
    const dialog = this.dialog.open(GoiCuocDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getProductSubByParentIDToList();
    });  
  }
  onDelete(ID: number) {
    if (confirm(environment.DeleteConfirm)) {
      this.configService.deleteByID(ID).then(res => {
        let result = res as number;
        if (result == 1) {
          this.getProductSubByParentIDToList();
          this.notificationService.success(environment.DeleteSuccess);
        }
        else {
          this.notificationService.warn(environment.DeleteNotSuccess);
        }
      });
    }
  }
}