import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductSubDetailComponent } from './product-sub-detail/product-sub-detail.component';

@Component({
  selector: 'app-product-sub',
  templateUrl: './product-sub.component.html',
  styleUrls: []
})
export class ProductSubComponent implements OnInit {

  parentID: number = environment.InitializationNumber;
  listProduct: Config[];
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'Title', 'GiaCuoc', 'Token', 'TongTien'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public configService: ConfigService,
    public notificationService: NotificationService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.getToList();
    this.getProductToList(this.searchString);
  }
  getToList() {
    this.configService.getProductSubByParentIDToList(this.parentID).then(res => {
      this.configService.list = res as Config[];
      this.dataSource = new MatTableDataSource(this.configService.list.sort((a, b) => a.SortOrder - b.SortOrder));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
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
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }
  onAdd(ID: number) {
    this.configService.getByID(ID).then(res => {
      this.configService.formData = res as Config;
      if (this.configService.formData.ID == environment.InitializationNumber) {
        this.configService.formData.GiaCuoc = environment.InitializationNumber;
        this.configService.formData.Token = environment.InitializationNumber;
        this.configService.formData.TongTien = environment.InitializationNumber;
      }
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;
    const dialog = this.dialog.open(ProductSubDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getToList();
    });
  }
  onDelete(ID: number) {
    if (confirm(environment.DeleteConfirm)) {
      this.configService.deleteByID(ID).then(res => {
        let result = res as number;
        if (result == 1) {
          this.getToList();
          this.notificationService.success(environment.DeleteSuccess);
        }
        else {
          this.notificationService.warn(environment.DeleteNotSuccess);
        }
      });
    }
  }
  onFilterProduct(searchString: string) {
    this.getProductToList(searchString);
  }
  onChangeParentID($event) {
    this.getToList();
  }
}
