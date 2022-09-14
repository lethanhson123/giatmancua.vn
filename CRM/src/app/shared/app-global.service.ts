import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { YearMonth } from './YearMonth.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AppGlobalService {

  list: YearMonth[];
  aPIURL: string = environment.APIURL;
  controller: string = "AppGlobal";
  constructor(private httpClient: HttpClient,
    private cookieService: CookieService) {
  }
  getMonthToList() {
    let url = this.aPIURL + this.controller + '/GetMonthToList';
    return this.httpClient.get(url).toPromise();
  }
  getYearToList() {
    let url = this.aPIURL + this.controller + '/GetYearToList';
    return this.httpClient.get(url).toPromise();
  }
  getCAID() {
    let url = this.aPIURL + this.controller + '/GetCAID';
    return this.httpClient.get(url).toPromise();
  }
  getVNPTID() {    
    return environment.VNPTID;
  }
  getCookieMembershipID() {
    let membershipIDString = this.cookieService.get(environment.MembershipID);
    if (membershipIDString.length == 0) {
      membershipIDString = "" + environment.InitializationNumber;
      this.cookieService.set(environment.MembershipID, membershipIDString);
    }
    let membershipID = parseInt(membershipIDString);
    return membershipID;
  }
  getCookieFullName() {
    let fullName = this.cookieService.get(environment.FullName);
    if (fullName.length == 0) {
      fullName = environment.PageTitle;
    }
    return fullName;
  }
  getCookieImageURL() {
    let imageURL = this.cookieService.get(environment.Image);
    if (imageURL.length == 0) {
      imageURL = environment.APIOnlineURL + environment.Images + "/" + environment.LogoFile;
    }
    return imageURL;
  }
}
