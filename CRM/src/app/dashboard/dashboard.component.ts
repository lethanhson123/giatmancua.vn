import { Component,  OnInit, ViewChild } from '@angular/core';
import { Dashboard } from 'src/app/shared/dashboard.model';
import { Membership } from 'src/app/shared/membership.model';
import { DashboardService } from 'src/app/shared/dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { AM_PhieuYeuCau } from 'src/app/shared/AM_PhieuYeuCau.model';
import { AM_PhieuYeuCauService } from 'src/app/shared/AM_PhieuYeuCau.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: []
})
export class DashboardComponent implements OnInit {

  infoURL: string = environment.AM_PhieuYeuCauInfoURL;
  detailURL: string = environment.DoanhNghiepDetailURL;
  dashboard: Dashboard;
  listMembership: Membership[];
  listDaGui: AM_PhieuYeuCau[];
  
  dataSourceDoanhNghiepCAHetHan: MatTableDataSource<any>;
  displayColumnsDoanhNghiepCAHetHan: string[] = ['FullName', 'Phone'];
  @ViewChild(MatSort) sortDoanhNghiepCAHetHan: MatSort;

  dataSourceAM_PhieuYeuCau: MatTableDataSource<any>;
  displayColumnsAM_PhieuYeuCau: string[] = ['TieuDe', 'NgayTao'];
  @ViewChild(MatSort) sortAM_PhieuYeuCau: MatSort;
  constructor(public dashboardService: DashboardService,
    public aM_PhieuYeuCauService: AM_PhieuYeuCauService) { }

  ngOnInit(): void {
    this.dashboard0001();
    this.dashboard0005();
    this.getDaGuiAndDaNhanAndDangXuLyToList();    
  }
  dashboard0001() {
    this.dashboardService.dashboard0001().then(res => {
      this.dashboard = res as Dashboard;      
    });
  }
  dashboard0005() {
    this.dashboardService.dashboard0005().then(res => {
      this.listMembership = res as Membership[];    
      this.dataSourceDoanhNghiepCAHetHan = new MatTableDataSource(this.listMembership);
      this.dataSourceDoanhNghiepCAHetHan.sort = this.sortDoanhNghiepCAHetHan;  
    });
  }
  getDaGuiAndDaNhanAndDangXuLyToList() {       
    this.aM_PhieuYeuCauService.getDaGuiAndDaNhanAndDangXuLyToList().then((res) => {
      this.listDaGui = res as AM_PhieuYeuCau[];
      this.dataSourceAM_PhieuYeuCau = new MatTableDataSource(this.listDaGui);
      this.dataSourceAM_PhieuYeuCau.sort = this.sortAM_PhieuYeuCau;  
    });
  }
}
