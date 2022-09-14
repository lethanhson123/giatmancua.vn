import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProductDetailComponent } from 'src/app/config/product/product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: []
})
export class ProductComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'SortOrder', 'Note', 'Title', 'ParentID', 'ID'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public configService: ConfigService,
    public notificationService: NotificationService,
    private dialog: MatDialog
  ) { }
  ngOnInit(): void {
    this.getToList();
  }
  getToList() {
    this.configService.getProductToList().then(res => {
      this.configService.list = res as Config[];
      this.dataSource = new MatTableDataSource(this.configService.list.sort((a, b) => (a.Title > b.Title ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }
  onAdd(ID: number) {
    this.configService.getByID(ID).then(res => {
      this.configService.formData = res as Config;
      console.log(res);
      console.log(this.configService.formData);
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;
    const dialog = this.dialog.open(ProductDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getToList();
      this.onSearch();
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
}
