import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Membership } from 'src/app/shared/membership.model';
import { MembershipService } from 'src/app/shared/membership.service';
import { NotificationService } from 'src/app/shared/notification.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent implements OnInit {

  logoURL: string = environment.APIOnlineURL + environment.Images + "/" + environment.LogoFile;
  pageTitle: string = environment.PageTitle;
  account: string = environment.InitializationString;
  password: string = environment.InitializationString;
  membership: Membership;
  constructor(public membershipService: MembershipService,
    public notificationService: NotificationService,
    private cookieService: CookieService,
    private router: Router) { }

  ngOnInit(): void {
  }
  onLogin() {
    console.log(environment.APIURL);
    this.membershipService.getByAccountAndPassword(this.account, this.password).then(
      data => {
        this.membership = data as Membership;
        if (this.membership.ID > 0) {
          this.cookieService.set(environment.MembershipID, "" + this.membership.ID);
          this.cookieService.set(environment.FullName, this.membership.FullName);
          this.cookieService.set(environment.Phone, this.membership.Phone);
          this.cookieService.set(environment.Image, this.membership.Image);
          let url = environment.DefaultSubURL;
          this.router.navigateByUrl(url);
        }
        else {
          console.log(data);
          this.notificationService.warn(environment.LoginNotSuccess);
        }
      },
      err => {
        console.log(err);
        this.notificationService.warn(environment.LoginNotSuccess);
      }
    );
  }
}
