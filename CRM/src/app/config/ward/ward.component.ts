import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { WardDetailComponent } from 'src/app/config/ward/ward-detail/ward-detail.component';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: []
})
export class WardComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'Title', 'SortOrder', 'ID'];
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
    this.configService.getWardToList().then(res => {
      this.configService.list = res as Config[];
      this.dataSource = new MatTableDataSource(this.configService.list.sort((a, b) => {
        const compareTitle = a.Title.localeCompare(b.Title);
        const compareParentID = a.ParentID - b.ParentID;
        return compareParentID || compareTitle;
      }));
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
    });
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = environment.DialogConfigWidth;
    const dialog = this.dialog.open(WardDetailComponent, dialogConfig);
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
}
