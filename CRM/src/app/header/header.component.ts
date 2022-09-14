import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { AppGlobalService } from 'src/app/shared/app-global.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})
export class HeaderComponent implements OnInit {

  logoURL: string = environment.APIOnlineURL + environment.Images + "/" + environment.LogoFile;
  pageTitle: string = environment.PageTitle;
  constructor(private appGlobalService: AppGlobalService,
    private router: Router) { 
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.logoURL = this.appGlobalService.getCookieImageURL();
        this.pageTitle = this.appGlobalService.getCookieFullName();
      }
    });
  }
  ngOnInit(): void {
  }
}
