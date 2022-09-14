import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { CKEditorModule } from 'ngx-ckeditor';
import { ConfigService } from './shared/config.service';
import { NotificationService } from './shared/notification.service';
import { MembershipService } from './shared/membership.service';
import { MembershipPropertyService } from './shared/MembershipProperty.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { ConfigComponent } from './config/config.component';
import { CityComponent } from './Config/city/city.component';
import { CityDetailComponent } from 'src/app/config/city/city-detail/city-detail.component';
import { MenuLeftComponent } from './Config/menu-left/menu-left.component';
import { MembershipTypeComponent } from './Config/membership-type/membership-type.component';
import { MenuLeftDetailComponent } from './Config/menu-left/menu-left-detail/menu-left-detail.component';
import { MembershipTypeDetailComponent } from './Config/membership-type/membership-type-detail/membership-type-detail.component';
import { ProvinceComponent } from './Config/province/province.component';
import { ProvinceDetailComponent } from './Config/Province/province-detail/province-detail.component';
import { NganHangComponent } from './Config/ngan-hang/ngan-hang.component';
import { NganHangDetailComponent } from './Config/ngan-hang/ngan-hang-detail/ngan-hang-detail.component';
import { ProductComponent } from './Config/product/product.component';
import { ProductDetailComponent } from './Config/Product/product-detail/product-detail.component';
import { UnitComponent } from './Config/unit/unit.component';
import { UnitDetailComponent } from './Config/Unit/unit-detail/unit-detail.component';
import { LoaiBaiVietComponent } from './Config/loai-bai-viet/loai-bai-viet.component';
import { LoaiBaiVietDetailComponent } from './Config/loai-bai-viet/loai-bai-viet-detail/loai-bai-viet-detail.component';
import { LoaiPhieuYeuCauComponent } from './Config/loai-phieu-yeu-cau/loai-phieu-yeu-cau.component';
import { LoaiPhieuYeuCauDetailComponent } from './Config/loai-phieu-yeu-cau/loai-phieu-yeu-cau-detail/loai-phieu-yeu-cau-detail.component';
import { WardComponent } from './Config/ward/ward.component';
import { WardDetailComponent } from './Config/Ward/ward-detail/ward-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MembershipComponent } from './membership/membership.component';
import { NhanVienComponent } from './membership/nhan-vien/nhan-vien.component';
import { NhanVienDetailComponent } from './membership/nhan-vien/nhan-vien-detail/nhan-vien-detail.component';
import { DoanhNghiepComponent } from './Membership/doanh-nghiep/doanh-nghiep.component';
import { DoanhNghiepDetailComponent } from './Membership/Doanh-Nghiep/doanh-nghiep-detail/doanh-nghiep-detail.component';
import { CustomerTypeComponent } from './Config/customer-type/customer-type.component';
import { CustomerTypeDetailComponent } from './Config/Customer-Type/customer-type-detail/customer-type-detail.component';
import { DoanhNghiepTaxCodeComponent } from './Membership/doanh-nghiep/doanh-nghiep-tax-code/doanh-nghiep-tax-code.component';
import { DoanhNghiepMembershipCodeComponent } from './Membership/doanh-nghiep/doanh-nghiep-membership-code/doanh-nghiep-membership-code.component';
import { DoanhNghiepTimKiemComponent } from './Membership/doanh-nghiep/doanh-nghiep-tim-kiem/doanh-nghiep-tim-kiem.component';
import { DoanhNghiepDichVuComponent } from './Membership/doanh-nghiep/doanh-nghiep-dich-vu/doanh-nghiep-dich-vu.component';
import { UploadComponent } from './Membership/upload/upload.component';
import { LoadingComponent } from './UI/loading/loading.component';
import { UIComponent } from './ui/ui.component';
import { PhanCongQuanLyComponent } from './Membership/nhan-vien/phan-cong-quan-ly/phan-cong-quan-ly.component';
import { PhanCongQuanLyDetailComponent } from './membership/nhan-vien/phan-cong-quan-ly/phan-cong-quan-ly-detail/phan-cong-quan-ly-detail.component';
import { PhanQuyenMenuComponent } from './membership/nhan-vien/phan-quyen-menu/phan-quyen-menu.component';
import { PhanQuyenMenuDetailComponent } from './Membership/nhan-vien/phan-quyen-menu/phan-quyen-menu-detail/phan-quyen-menu-detail.component';
import { DoanhNghiepCAHetHanComponent } from './Membership/doanh-nghiep/doanh-nghiep-cahet-han/doanh-nghiep-cahet-han.component';
import { CookieService } from 'ngx-cookie-service';
import { LoginLayoutComponent } from './Layouts/login-layout/login-layout.component';
import { DashBoardLayoutComponent } from './Layouts/dash-board-layout/dash-board-layout.component';
import { LoginComponent } from './login/login.component';
import { ThongTinCaNhanComponent } from './membership/nhan-vien/thong-tin-ca-nhan/thong-tin-ca-nhan.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoanhThuTongHopComponent } from './Dashboard/doanh-thu-tong-hop/doanh-thu-tong-hop.component';
import { ChartsModule } from 'ng2-charts';
import { AppGlobalService } from './shared/app-global.service';
import { DashboardService } from './shared/dashboard.service';
import { InvoiceService } from './shared/Invoice.service';
import { InvoicePropertyService } from './shared/InvoiceProperty.service';
import { UploadService } from './shared/upload.service';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceTimKiemComponent } from './Invoice/invoice-tim-kiem/invoice-tim-kiem.component';
import { DoanhThuTheoHuyenComponent } from './Dashboard/doanh-thu-theo-huyen/doanh-thu-theo-huyen.component';
import { DoanhNghiepLienHeComponent } from './Membership/doanh-nghiep/doanh-nghiep-lien-he/doanh-nghiep-lien-he.component';
import { DoanhNghiepCATaoMoiComponent } from './membership/doanh-nghiep/doanh-nghiep-catao-moi/doanh-nghiep-catao-moi.component';
import { DoanhNghiepCADangHoatDongComponent } from './membership/doanh-nghiep/doanh-nghiep-cadang-hoat-dong/doanh-nghiep-cadang-hoat-dong.component';
import { DoanhNghiepCAGiaHanComponent } from './membership/doanh-nghiep/doanh-nghiep-cagia-han/doanh-nghiep-cagia-han.component';
import { AMNgonNguComponent } from './Config/amngon-ngu/amngon-ngu.component';
import { AMMauHoaDonComponent } from './Config/ammau-hoa-don/ammau-hoa-don.component';
import { AMMauSoComponent } from './Config/ammau-so/ammau-so.component';
import { AMHeThongComponent } from './Config/amhe-thong/amhe-thong.component';
import { AMHeThongDetailComponent } from './Config/amhe-thong/amhe-thong-detail/amhe-thong-detail.component';
import { AMMauHoaDonDetailComponent } from './Config/ammau-hoa-don/ammau-hoa-don-detail/ammau-hoa-don-detail.component';
import { AMMauSoDetailComponent } from './Config/ammau-so/ammau-so-detail/ammau-so-detail.component';
import { AMNgonNguDetailComponent } from './Config/amngon-ngu/amngon-ngu-detail/amngon-ngu-detail.component';
import { AMPhieuYeuCauComponent } from './am-phieu-yeu-cau/am-phieu-yeu-cau.component';
import { AMPhieuYeuCauDanhSachComponent } from './am-phieu-yeu-cau/am-phieu-yeu-cau-danh-sach/am-phieu-yeu-cau-danh-sach.component';
import { AMPhieuYeuCauDetailComponent } from './am-phieu-yeu-cau/am-phieu-yeu-cau-detail/am-phieu-yeu-cau-detail.component';
import { AM_PhieuYeuCauService } from './shared/AM_PhieuYeuCau.service';
import { AMPhieuYeuCauInfoComponent } from './am-phieu-yeu-cau/amphieu-yeu-cau-info/amphieu-yeu-cau-info.component';
import { AMPhieuYeuCauListKyThuatComponent } from './am-phieu-yeu-cau/amphieu-yeu-cau-list-ky-thuat/amphieu-yeu-cau-list-ky-thuat.component';
import { AMPhieuYeuCauHoanThanhComponent } from './am-phieu-yeu-cau/amphieu-yeu-cau-hoan-thanh/amphieu-yeu-cau-hoan-thanh.component';
import { ChucVuComponent } from './config/chuc-vu/chuc-vu.component';
import { ProductGroupComponent } from './config/product-group/product-group.component';
import { ProductSubComponent } from './config/product-sub/product-sub.component';
import { ChucVuDetailComponent } from './config/chuc-vu/chuc-vu-detail/chuc-vu-detail.component';
import { ProductGroupDetailComponent } from './config/product-group/product-group-detail/product-group-detail.component';
import { ProductSubDetailComponent } from './config/product-sub/product-sub-detail/product-sub-detail.component';
import { DoanhNghiepNguoiLienHeComponent } from './membership/doanh-nghiep/doanh-nghiep-detail/doanh-nghiep-nguoi-lien-he/doanh-nghiep-nguoi-lien-he.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DoanhNghiepDichVuTiepCanComponent } from './membership/doanh-nghiep/doanh-nghiep-detail/doanh-nghiep-dich-vu-tiep-can/doanh-nghiep-dich-vu-tiep-can.component';
import { DoanhNghiepProductCountComponent } from './membership/doanh-nghiep/doanh-nghiep-product-count/doanh-nghiep-product-count.component';
import { DoanhThuTheoDichVuComponent } from './dashboard/doanh-thu-theo-dich-vu/doanh-thu-theo-dich-vu.component';
import { DoanhThuChiTietTheoThangComponent } from './dashboard/doanh-thu-chi-tiet-theo-thang/doanh-thu-chi-tiet-theo-thang.component';
import { VnptComponent } from './membership/nhan-vien/vnpt/vnpt.component';
import { ChuKySoCAComponent } from './BaoCaoThongKe/chu-ky-so-ca/chu-ky-so-ca.component';
import { HoaDonDienTuComponent } from './BaoCaoThongKe/hoa-don-dien-tu/hoa-don-dien-tu.component';
import { BaoHiemXaHoiComponent } from './BaoCaoThongKe/bao-hiem-xa-hoi/bao-hiem-xa-hoi.component';
import { DoanhNghiepCAMoiComponent } from './Membership/doanh-nghiep/doanh-nghiep-camoi/doanh-nghiep-camoi.component';
import { DoanhNghiepMoiComponent } from './Membership/doanh-nghiep/doanh-nghiep-moi/doanh-nghiep-moi.component';
import { DoanhThuMoiTheoThangComponent } from './dashboard/doanh-thu-moi-theo-thang/doanh-thu-moi-theo-thang.component';
import { WorkListService } from './shared/WorkList.service';
import { WorkListMembershipService } from './shared/WorkListMembership.service';
import { WorkListComponent } from './work-list/work-list.component';
import { WorkListDetailComponent } from './work-list-detail/work-list-detail.component';
import { ThanhVienComponent } from './CMS/thanh-vien/thanh-vien.component';
import { ThanhVienInfoComponent } from './CMS/thanh-vien/thanh-vien-info/thanh-vien-info.component';
import { VNPTInfoComponent } from './CMS/vnptinfo/vnptinfo.component';
import { BlogComponent } from './CMS/blog/blog.component';
import { BlogInfoComponent } from './CMS/Blog/blog-info/blog-info.component';
import { BlogCategoryComponent } from './CMS/blog-category/blog-category.component';
import { BlogCategoryInfoComponent } from './CMS/Blog-Category/blog-category-info/blog-category-info.component';
import { CustomerComponent } from './CMS/customer/customer.component';
import { DichVuComponent } from './CMS/dich-vu/dich-vu.component';
import { DichVuInfoComponent } from './CMS/dich-vu/dich-vu-info/dich-vu-info.component';
import { GoiCuocDetailComponent } from './CMS/dich-vu/goi-cuoc-detail/goi-cuoc-detail.component';
import { ContactComponent } from './CMS/contact/contact.component';
import { ContactInfoComponent } from './CMS/Contact/contact-info/contact-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidenavComponent,
    ConfigComponent,
    CityComponent ,
    CityDetailComponent,
    MenuLeftComponent,   
    MenuLeftDetailComponent, 
    MembershipTypeComponent,
    MembershipTypeDetailComponent, 
    ProvinceComponent, 
    ProvinceDetailComponent,     
    NganHangComponent, 
    NganHangDetailComponent, 
    ProductComponent, 
    ProductDetailComponent, 
    UnitComponent, 
    UnitDetailComponent, 
    LoaiBaiVietComponent, 
    LoaiBaiVietDetailComponent, 
    LoaiPhieuYeuCauComponent, 
    LoaiPhieuYeuCauDetailComponent, 
    WardComponent, 
    WardDetailComponent, 
    PageNotFoundComponent, 
    MembershipComponent, 
    NhanVienComponent, 
    NhanVienDetailComponent, 
    DoanhNghiepComponent, 
    DoanhNghiepDetailComponent, 
    CustomerTypeComponent, 
    CustomerTypeDetailComponent, 
    DoanhNghiepTaxCodeComponent, 
    DoanhNghiepMembershipCodeComponent, 
    DoanhNghiepTimKiemComponent, 
    DoanhNghiepDichVuComponent, 
    UploadComponent, 
    LoadingComponent, 
    UIComponent, 
    PhanCongQuanLyComponent, 
    PhanCongQuanLyDetailComponent, 
    PhanQuyenMenuComponent, 
    PhanQuyenMenuDetailComponent, 
    DoanhNghiepCAHetHanComponent, 
    LoginLayoutComponent, 
    DashBoardLayoutComponent, 
    LoginComponent, 
    ThongTinCaNhanComponent, 
    DashboardComponent, 
    DoanhThuTongHopComponent, 
    InvoiceComponent, 
    InvoiceTimKiemComponent, 
    DoanhThuTheoHuyenComponent, 
    DoanhNghiepLienHeComponent, 
    DoanhNghiepCATaoMoiComponent, 
    DoanhNghiepCADangHoatDongComponent, 
    DoanhNghiepCAGiaHanComponent, 
    AMNgonNguComponent, 
    AMMauHoaDonComponent, 
    AMMauSoComponent, 
    AMHeThongComponent, 
    AMHeThongDetailComponent, 
    AMMauHoaDonDetailComponent, 
    AMMauSoDetailComponent, 
    AMNgonNguDetailComponent, 
    AMPhieuYeuCauComponent, 
    AMPhieuYeuCauDanhSachComponent, 
    AMPhieuYeuCauDetailComponent, 
    AMPhieuYeuCauInfoComponent, 
    AMPhieuYeuCauListKyThuatComponent, 
    AMPhieuYeuCauHoanThanhComponent, 
    ChucVuComponent, 
    ProductGroupComponent, 
    ProductSubComponent, 
    ChucVuDetailComponent, 
    ProductGroupDetailComponent, 
    ProductSubDetailComponent, 
    DoanhNghiepNguoiLienHeComponent, 
    DoanhNghiepDichVuTiepCanComponent, 
    DoanhNghiepProductCountComponent, 
    DoanhThuTheoDichVuComponent, 
    DoanhThuChiTietTheoThangComponent, 
    VnptComponent, 
    ChuKySoCAComponent, 
    HoaDonDienTuComponent, 
    BaoHiemXaHoiComponent, DoanhNghiepCAMoiComponent, DoanhNghiepMoiComponent, DoanhThuMoiTheoThangComponent, WorkListComponent, WorkListDetailComponent, ThanhVienComponent, ThanhVienInfoComponent, VNPTInfoComponent, BlogComponent, BlogInfoComponent, BlogCategoryComponent, BlogCategoryInfoComponent, CustomerComponent, DichVuComponent, DichVuInfoComponent, GoiCuocDetailComponent, ContactComponent, ContactInfoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    CKEditorModule,
  ],
  providers: [
    AppGlobalService,
    ConfigService,
    DashboardService,
    InvoiceService,
    InvoicePropertyService,    
    MembershipService,
    MembershipPropertyService, 
    UploadService,   
    NotificationService,
    CookieService,  
    AM_PhieuYeuCauService,  
    WorkListService,  
    WorkListMembershipService,  
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
