import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MembershipTypeDetailComponent } from 'src/app/config/membership-type/membership-type-detail/membership-type-detail.component';

@Component({
  selector: 'app-membership-type',
  templateUrl: './membership-type.component.html',
  styleUrls: []
})
export class MembershipTypeComponent implements OnInit {

  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['actions', 'Title', 'SortOrder'];
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
    this.configService.getMembershipTypeToList().then(res => {
      this.configService.list = res as Config[];
      this.dataSource = new MatTableDataSource(this.configService.list.sort((a, b) => a.SortOrder - b.SortOrder));
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
    const dialog = this.dialog.open(MembershipTypeDetailComponent, dialogConfig);
    dialog.afterClosed().subscribe(() => {
      this.getToList();
    });
  }
  onDelete(ID: number) {
    if (confirm(environment.DeleteConfirm)) {
      this.configService.deleteByID(ID).then(res => {
        let result = res as number;
        if(result==1){
          this.getToList();
          this.notificationService.success(environment.DeleteSuccess);
        }
        else{
          this.notificationService.warn(environment.DeleteNotSuccess);
        }
      });
    }
  }

}
