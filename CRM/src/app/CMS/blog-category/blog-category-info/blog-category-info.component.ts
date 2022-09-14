import { Component, OnInit } from '@angular/core';
import { BlogCategory } from 'src/app/shared/BlogCategory.model';
import { BlogCategoryService } from 'src/app/shared/BlogCategory.service';
import { NgForm } from '@angular/forms';
import { NotificationService } from 'src/app/shared/notification.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-blog-category-info',
  templateUrl: './blog-category-info.component.html',
  styleUrls: ['./blog-category-info.component.css']
})
export class BlogCategoryInfoComponent implements OnInit {

  listURL: string = "/BlogCategory";
  detailURL: string = "BlogCategory/Info";
  fileToUpload: File = null;
  constructor(
    public blogCategoryService: BlogCategoryService,    
    public notificationService: NotificationService,
    private router: Router
  ) {    
    this.getByIDQueryString();
  }

  ngOnInit(): void {
  }
    
  getByIDQueryString() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let IDString = event.url;
        IDString = IDString.split('/')[IDString.split('/').length - 1];
        let ID = parseInt(IDString);
        this.blogCategoryService.getByID(ID).then(res => {
          this.blogCategoryService.formData = res as BlogCategory;
          this.notificationService.success(environment.SaveSuccess);
        });
      }
    });
  }
  onSubmit(form: NgForm) {    
    this.blogCategoryService.save(form.value).subscribe(
      data => {
        if (form.value.ID > 0) {
          this.notificationService.warn(environment.SaveSuccess);
        }
        else {
          let url = this.detailURL + "/" + data;
          this.router.navigateByUrl(url);
        }
      },
      err => {
        this.notificationService.warn(environment.SaveNotSuccess);
      }
    );
  } 
}
