import { Component, OnInit } from '@angular/core';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { environment } from 'src/environments/environment';
import { Router, NavigationEnd } from '@angular/router';
import { AppGlobalService } from 'src/app/shared/app-global.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: []
})
export class SidenavComponent implements OnInit {

  listMenuLeft: Config[];
  pageTitle: string = environment.PageTitle;
  logoURL: string = environment.APIOnlineURL + environment.Images + "/" + environment.LogoFile;
  currentURL: string = environment.InitializationString;
  controller: string = environment.InitializationString;
  parentID: number = environment.InitializationNumber;

  constructor(public configService: ConfigService,    
    private appGlobalService: AppGlobalService,
    private cookieService: CookieService,
    private router: Router
  ) {    
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.currentURL = event.url;
        this.controller = this.currentURL;
        this.controller = this.controller.substr(1, this.controller.length - 1);        
      }
    });
    //this.getToList();
  }

  ngOnInit(): void {
  }
  getToList() {    
    this.configService.getMenuLeftByPhanQuyenToList(this.appGlobalService.getCookieMembershipID()).then(res => {
      this.listMenuLeft = (res as Config[]);
      for (let item of this.listMenuLeft) {
        if (this.controller.includes(item.Controller) && item.ParentID != 0 && item.IsMenuLeft == true) {
          this.parentID = item.ParentID;          
        }
      };
    });
  }
  onLogout(){
    this.cookieService.set(environment.MembershipID, "" + environment.InitializationNumber);
    this.cookieService.set(environment.FullName, environment.InitializationString);
    this.cookieService.set(environment.Phone, environment.InitializationString);
    this.cookieService.set(environment.Image, environment.InitializationString);
    let url = environment.LoginSubURL;
    this.router.navigateByUrl(url);
  }
}
