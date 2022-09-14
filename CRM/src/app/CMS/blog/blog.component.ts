import { Component, OnInit, ViewChild } from '@angular/core';
import { BlogCategory } from 'src/app/shared/BlogCategory.model';
import { BlogCategoryService } from 'src/app/shared/BlogCategory.service';
import { Blog } from 'src/app/shared/Blog.model';
import { BlogService } from 'src/app/shared/Blog.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  parentID: number = environment.InitializationNumber;
  isBanner: boolean = false;
  detailURL: string = "/Blog/Info";
  dataSource: MatTableDataSource<any>;
  displayColumns: string[] = ['ID', 'URLImage', 'DatePost', 'Title', 'URLCode', 'Code','SortOrder','IsBanner', 'Active', 'actions'];
  searchString: string = environment.InitializationString;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public blogCategoryService: BlogCategoryService,
    public blogService: BlogService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.getBlogCategoryToList(); 
    this.onSearch();   
  }

  getBlogCategoryToList() {
    this.blogCategoryService.getAllToList().then(res => {
      this.blogCategoryService.list = res as BlogCategory[];           
    });
  }

  getToList() {
    this.blogService.getByParentIDOrSearchOrIsBannerToList(this.parentID, this.searchString, this.isBanner).then(res => {
      this.blogService.list = res as Blog[];      
      this.dataSource = new MatTableDataSource(this.blogService.list.sort((a, b) => (a.DatePost > b.DatePost ? 1 : -1)));
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  onSearch() {
    this.getToList();
  }    
  initializationSiteMapToXML() {
    this.blogService.initializationSiteMapToXML().then(res => {      
    });
  }
}
