import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: []
})
export class FooterComponent implements OnInit {

  domainWebsiteURL: string = environment.DomainWebsiteURL;
  constructor() { }

  ngOnInit(): void {
  }
}
