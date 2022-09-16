import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router, NavigationEnd } from '@angular/router';
import { Config } from 'src/app/shared/config.model';
import { ConfigService } from 'src/app/shared/config.service';
import { AppGlobalService } from 'src/app/shared/app-global.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent {  
  title = environment.PageTitle;
  isDashBoardHiden: boolean = false;
  mainID: string = environment.MainID;
  listMenuLeft: Config[];
  constructor(private cookieService: CookieService,
    private appGlobalService: AppGlobalService,
    private router: Router) {
    //this.onCheckCookie();
    //this.onCheckHiden();
  }
  onCheckHiden() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        let url = event.url;
        if (url == environment.LoginSubURL) {
          this.isDashBoardHiden = true;
          this.mainID = environment.InitializationString;
        }
        else {
          this.isDashBoardHiden = false;
          this.mainID = environment.MainID;
        }
      }
    });
  }
  onCheckCookie() {
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {       
        let membershipID = this.appGlobalService.getCookieMembershipID();
        if (membershipID > 0) {
          // let url = event.url;
          // this.configService.getMenuLeftByPhanQuyenToList().then(res => {
          //   this.listMenuLeft = (res as Config[]).sort((a, b) => a.SortOrder - b.SortOrder);
          //   for (let i = 0; i < this.listMenuLeft.length; i++) {
          //     if (url.includes(this.listMenuLeft[i].Controller)) {
          //       check = 1;
          //       i = this.listMenuLeft.length;
          //     }
          //   }
          // });
        }
        else {
          this.router.navigateByUrl(environment.LoginSubURL);
        }
      }
    });
  }
}
