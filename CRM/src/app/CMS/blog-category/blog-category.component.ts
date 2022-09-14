import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogCategory } from 'src/app/shared/BlogCategory.model';
import { BlogCategoryService } from 'src/app/shared/BlogCategory.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog-category',
  templateUrl: './blog-category.component.html',
  styleUrls: ['./blog-category.component.css']
})
export class BlogCategoryComponent implements OnInit {

  detailURL: string = "/BlogCategory/Info";
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ID', 'Title', 'Description', 'URLCode', 'Code', 'SortOrder', 'Active', 'actions'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public blogCategoryService: BlogCategoryService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getToList();
  }

  getToList() {
    this.blogCategoryService.getAllToList().then(res => {
      this.blogCategoryService.list = res as BlogCategory[];      
      this.dataSource = new MatTableDataSource(this.blogCategoryService.list.sort((a, b) => (a.SortOrder > b.SortOrder ? 1 : -1)));
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