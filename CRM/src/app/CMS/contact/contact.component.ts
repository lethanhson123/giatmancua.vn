import { Component, OnInit, ViewChild } from '@angular/core';
import { Contact } from 'src/app/shared/Contact.model';
import { ContactService } from 'src/app/shared/Contact.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  detailURL: string = "/ThanhVien/Info";
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['DatePost', 'Code', 'FullName', 'Email', 'Description'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public contactService: ContactService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getToList();
  }

  getToList() {
    this.contactService.getByActiveAndSearchStringToList(true, this.searchString).then(res => {
      this.contactService.list = res as Contact[];      
      this.dataSource = new MatTableDataSource(this.contactService.list.sort((a, b) => (a > b ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  onSearch() {
    this.dataSource.filter = this.searchString.toLowerCase();
  }   
  onRefresh() {
    this.getToList();
  }  
}
