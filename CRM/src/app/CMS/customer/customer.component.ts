import { Component, OnInit, ViewChild } from '@angular/core';
import { Customer } from 'src/app/shared/Customer.model';
import { CustomerService } from 'src/app/shared/Customer.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  detailURL: string = "/Customer/Info";
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['DatePost', 'Code', 'TaxCode', 'FullName', 'ConfigProductTitle', 'ConfigProductSubTitle'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public customerService: CustomerService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getToList();
  }

  getToList() {
    this.customerService.getByActiveAndSearchStringToList(true, this.searchString).then(res => {
      this.customerService.list = res as Customer[];      
      this.dataSource = new MatTableDataSource(this.customerService.list.sort((a, b) => (a > b ? 1 : -1)));
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
