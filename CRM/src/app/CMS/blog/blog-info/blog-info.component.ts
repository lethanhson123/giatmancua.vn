import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogCategory } from 'src/app/shared/BlogCategory.model';
import { BlogCategoryService } from 'src/app/shared/BlogCategory.service';
import { Blog } from 'src/app/shared/Blog.model';
import { BlogService } from 'src/app/shared/Blog.service';
import { BlogComment } from 'src/app/shared/BlogComment.model';
import { BlogCommentService } from 'src/app/shared/BlogComment.service';
import { BlogFile } from 'src/app/shared/BlogFile.model';
import { BlogFileService } from 'src/app/shared/BlogFile.service';
import { BlogTag } from 'src/app/shared/BlogTag.model';
import { BlogTagService } from 'src/app/shared/BlogTag.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-blog-info',
  templateUrl: './blog-info.component.html',
  styleUrls: ['./blog-info.component.css']
})
export class BlogInfoComponent implements OnInit {


  isTapTinDinhKem: boolean = false;
  isShowLoading: boolean = false;
  listURL: string = "/Blog";
  detailURL: string = "/Blog/Info";
  fileToUpload: any;
  fileToUpload0: File = null;

  blogCommentDescription: string = environment.InitializationString;
  blogTagDescription: string = environment.InitializationString;

  dataSourceBlogFile: MatTableDataSource<any>;
  displayColumnsBlogFile: string[] = ['Image', 'URLImage', 'actions'];
  @ViewChild(MatSort) sortBlogFile: MatSort;
  @ViewChild(MatPaginator) paginatorBlogFile: MatPaginator;

  dataSourceBlogComment: MatTableDataSource<any>;
  displayColumnsBlogComment: string[] = ['Description', 'actions'];
  @ViewChild(MatSort) sortBlogComment: MatSort;
  @ViewChild(MatPaginator) paginatorBlogComment: MatPaginator;

  dataSourceBlogTag: MatTableDataSource<any>;
  displayColumnsBlogTag: string[] = ['Tag', 'actions'];
  @ViewChild(MatSort) sortBlogTag: MatSort;
  @ViewChild(MatPaginator) paginatorBlogTag: MatPaginator;

  constructor(
    public blogCategoryService: BlogCategoryService,
    public blogService: BlogService,
    public blogCommentService: BlogCommentService,
    public blogFileService: BlogFileService,
    public blogTagService: BlogTagService,
    public notificationService: NotificationService,
    private router: Router
  ) {
    this.getBlogCategoryToList();
    this.getByIDQueryString();
  }

  ngOnInit(): void {
  }

  getBlogCategoryToList() {
    this.blogCategoryService.getAllToList().then(res => {
      this.blogCategoryService.list = res as BlogCategory[];
    });
  }

  getByIDQueryString() {
    this.isShowLoading = true;
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let IDString = event.url;
        IDString = IDString.split('/')[IDString.split('/').length - 1];
        let ID = parseInt(IDString);
        this.blogService.getByID(ID).then(res => {
          this.blogService.formData = res as Blog;
          this.getBlogCommentByParentIDToList();
          this.getBlogFileByParentIDToList();
          this.getBlogTagByParentIDToList();
          this.notificationService.success(environment.SaveSuccess);
          this.isShowLoading = false;
        });
      }
    });
  }

  getBlogCommentByParentIDToList() {
    this.blogCommentService.getByParentIDToList(this.blogService.formData.ID).then(res => {
      this.blogCommentService.list = res as BlogComment[];
      this.dataSourceBlogComment = new MatTableDataSource(this.blogCommentService.list.sort((a, b) => (a.DatePost > b.DatePost ? 1 : -1)));
      this.dataSourceBlogComment.sort = this.sortBlogComment;
      this.dataSourceBlogComment.paginator = this.paginatorBlogComment;
    });
  }

  getBlogFileByParentIDToList() {
    this.blogFileService.getByParentIDToList(this.blogService.formData.ID).then(res => {
      this.blogFileService.list = res as BlogFile[];
      this.dataSourceBlogFile = new MatTableDataSource(this.blogFileService.list.sort((a, b) => (a.ID > b.ID ? 1 : -1)));
      this.dataSourceBlogFile.sort = this.sortBlogFile;
      this.dataSourceBlogFile.paginator = this.paginatorBlogFile;
    });
  }

  getBlogTagByParentIDToList() {
    this.blogTagService.getByParentIDToList(this.blogService.formData.ID).then(res => {
      this.blogTagService.list = res as BlogTag[];
      this.dataSourceBlogTag = new MatTableDataSource(this.blogTagService.list.sort((a, b) => (a.Tag > b.Tag ? 1 : -1)));
      this.dataSourceBlogTag.sort = this.sortBlogTag;
      this.dataSourceBlogTag.paginator = this.paginatorBlogTag;
    });
  }

  onSubmit(form: NgForm) {
    this.isShowLoading = true;
    this.blogService.saveAndUploadImage(form.value, this.fileToUpload, this.isTapTinDinhKem).subscribe(
      data => {
        if (form.value.ID > 0) {
          this.notificationService.warn(environment.SaveSuccess);
          this.isShowLoading = false;
          this.getBlogCommentByParentIDToList();
          this.getBlogFileByParentIDToList();
          this.getBlogTagByParentIDToList();
        }
        else {
          let url = this.detailURL + "/" + data;
          this.router.navigateByUrl(url);
        }
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }
    );
  }
  changeImage(files: FileList) {
    if (files) {
      this.fileToUpload = files;
      this.fileToUpload0 = files.item(0);
      var reader = new FileReader();
      reader.onload = (event: any) => {
        this.blogService.formData.URLImage = event.target.result;
      };
      reader.readAsDataURL(this.fileToUpload0);
    }
  }

  onBlogFileDelete(item: BlogFile) {
    if (confirm(environment.DeleteConfirm)) {
      this.isShowLoading = true;
      this.blogFileService.removeByID(item.ID).then(
        res => {
          this.notificationService.warn(environment.DeleteSuccess);
          this.getBlogFileByParentIDToList();
          this.isShowLoading = false;
        },
        err => {
          this.notificationService.warn(environment.DeleteNotSuccess);
          this.isShowLoading = false;
        }
      );
    }
  }
  onBlogCommentDelete(item: BlogComment) {
    if (confirm(environment.DeleteConfirm)) {
      this.isShowLoading = true;
      this.blogCommentService.removeByID(item.ID).then(
        res => {
          this.notificationService.warn(environment.DeleteSuccess);
          this.getBlogCommentByParentIDToList();
          this.isShowLoading = false;
        },
        err => {
          this.notificationService.warn(environment.DeleteNotSuccess);
          this.isShowLoading = false;
        }
      );
    }
  }
  onBlogTagDelete(item: BlogTag) {
    if (confirm(environment.DeleteConfirm)) {
      this.isShowLoading = true;
      this.blogTagService.removeByID(item.ID).then(
        res => {
          this.notificationService.warn(environment.DeleteSuccess);
          this.getBlogTagByParentIDToList();
          this.isShowLoading = false;
        },
        err => {
          this.notificationService.warn(environment.DeleteNotSuccess);
          this.isShowLoading = false;
        }
      );
    }
  }
  onBlogCommentSave() {    
    this.isShowLoading = true;    
    this.blogCommentService.formData.ParentID=this.blogService.formData.ID;
    this.blogCommentService.formData.Description=this.blogCommentDescription;
    this.blogCommentService.save(this.blogCommentService.formData).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.getBlogCommentByParentIDToList();
        this.isShowLoading = false;
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }      
    );    
  }
  onBlogTagSave() {    
    this.isShowLoading = true;    
    this.blogTagService.formData.ParentID=this.blogService.formData.ID;
    this.blogTagService.formData.Tag=this.blogTagDescription;
    this.blogTagService.save(this.blogTagService.formData).subscribe(
      res => {
        this.notificationService.success(environment.SaveSuccess);
        this.getBlogTagByParentIDToList();
        this.isShowLoading = false;
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
        this.isShowLoading = false;
      }      
    );    
  }
}
