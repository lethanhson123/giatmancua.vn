import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from 'src/app/Config/city/city.component';
import { ConfigComponent } from 'src/app/config/config.component';
import { MembershipTypeComponent } from 'src/app/Config/membership-type/membership-type.component';
import { MenuLeftComponent } from 'src/app/Config/menu-left/menu-left.component';
import { AMPhieuYeuCauDanhSachComponent } from './am-phieu-yeu-cau/am-phieu-yeu-cau-danh-sach/am-phieu-yeu-cau-danh-sach.component';
import { AMPhieuYeuCauDetailComponent } from './am-phieu-yeu-cau/am-phieu-yeu-cau-detail/am-phieu-yeu-cau-detail.component';
import { AMPhieuYeuCauComponent } from './am-phieu-yeu-cau/am-phieu-yeu-cau.component';
import { AMPhieuYeuCauHoanThanhComponent } from './am-phieu-yeu-cau/amphieu-yeu-cau-hoan-thanh/amphieu-yeu-cau-hoan-thanh.component';
import { AMPhieuYeuCauInfoComponent } from './am-phieu-yeu-cau/amphieu-yeu-cau-info/amphieu-yeu-cau-info.component';
import { AMPhieuYeuCauListKyThuatComponent } from './am-phieu-yeu-cau/amphieu-yeu-cau-list-ky-thuat/amphieu-yeu-cau-list-ky-thuat.component';
import { BaoHiemXaHoiComponent } from './BaoCaoThongKe/bao-hiem-xa-hoi/bao-hiem-xa-hoi.component';
import { ChuKySoCAComponent } from './BaoCaoThongKe/chu-ky-so-ca/chu-ky-so-ca.component';
import { HoaDonDienTuComponent } from './BaoCaoThongKe/hoa-don-dien-tu/hoa-don-dien-tu.component';
import { BlogCategoryInfoComponent } from './CMS/Blog-Category/blog-category-info/blog-category-info.component';
import { BlogCategoryComponent } from './CMS/blog-category/blog-category.component';
import { BlogInfoComponent } from './CMS/Blog/blog-info/blog-info.component';
import { BlogComponent } from './CMS/blog/blog.component';
import { ContactComponent } from './CMS/contact/contact.component';
import { CustomerComponent } from './CMS/customer/customer.component';
import { DichVuInfoComponent } from './CMS/dich-vu/dich-vu-info/dich-vu-info.component';
import { DichVuComponent } from './CMS/dich-vu/dich-vu.component';
import { ThanhVienInfoComponent } from './CMS/thanh-vien/thanh-vien-info/thanh-vien-info.component';
import { ThanhVienComponent } from './CMS/thanh-vien/thanh-vien.component';
import { VNPTInfoComponent } from './CMS/vnptinfo/vnptinfo.component';
import { AMHeThongComponent } from './Config/amhe-thong/amhe-thong.component';
import { AMMauHoaDonComponent } from './Config/ammau-hoa-don/ammau-hoa-don.component';
import { AMMauSoComponent } from './Config/ammau-so/ammau-so.component';
import { AMNgonNguComponent } from './Config/amngon-ngu/amngon-ngu.component';
import { ChucVuComponent } from './config/chuc-vu/chuc-vu.component';
import { CustomerTypeComponent } from './Config/customer-type/customer-type.component';
import { LoaiBaiVietComponent } from './Config/loai-bai-viet/loai-bai-viet.component';
import { LoaiPhieuYeuCauComponent } from './Config/loai-phieu-yeu-cau/loai-phieu-yeu-cau.component';
import { NganHangComponent } from './Config/ngan-hang/ngan-hang.component';
import { ProductGroupComponent } from './config/product-group/product-group.component';
import { ProductSubComponent } from './config/product-sub/product-sub.component';
import { ProductComponent } from './Config/product/product.component';
import { ProvinceComponent } from './Config/province/province.component';
import { UnitComponent } from './Config/unit/unit.component';
import { WardComponent } from './Config/ward/ward.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DoanhThuChiTietTheoThangComponent } from './dashboard/doanh-thu-chi-tiet-theo-thang/doanh-thu-chi-tiet-theo-thang.component';
import { DoanhThuMoiTheoThangComponent } from './dashboard/doanh-thu-moi-theo-thang/doanh-thu-moi-theo-thang.component';
import { DoanhThuTheoDichVuComponent } from './dashboard/doanh-thu-theo-dich-vu/doanh-thu-theo-dich-vu.component';
import { DoanhThuTheoHuyenComponent } from './Dashboard/doanh-thu-theo-huyen/doanh-thu-theo-huyen.component';
import { DoanhThuTongHopComponent } from './Dashboard/doanh-thu-tong-hop/doanh-thu-tong-hop.component';
import { InvoiceTimKiemComponent } from './Invoice/invoice-tim-kiem/invoice-tim-kiem.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { DoanhNghiepCADangHoatDongComponent } from './membership/doanh-nghiep/doanh-nghiep-cadang-hoat-dong/doanh-nghiep-cadang-hoat-dong.component';
import { DoanhNghiepCAGiaHanComponent } from './membership/doanh-nghiep/doanh-nghiep-cagia-han/doanh-nghiep-cagia-han.component';
import { DoanhNghiepCAHetHanComponent } from './Membership/doanh-nghiep/doanh-nghiep-cahet-han/doanh-nghiep-cahet-han.component';
import { DoanhNghiepCAMoiComponent } from './Membership/doanh-nghiep/doanh-nghiep-camoi/doanh-nghiep-camoi.component';
import { DoanhNghiepCATaoMoiComponent } from './membership/doanh-nghiep/doanh-nghiep-catao-moi/doanh-nghiep-catao-moi.component';
import { DoanhNghiepDetailComponent } from './Membership/Doanh-Nghiep/doanh-nghiep-detail/doanh-nghiep-detail.component';
import { DoanhNghiepDichVuComponent } from './Membership/doanh-nghiep/doanh-nghiep-dich-vu/doanh-nghiep-dich-vu.component';
import { DoanhNghiepLienHeComponent } from './Membership/doanh-nghiep/doanh-nghiep-lien-he/doanh-nghiep-lien-he.component';
import { DoanhNghiepMembershipCodeComponent } from './Membership/doanh-nghiep/doanh-nghiep-membership-code/doanh-nghiep-membership-code.component';
import { DoanhNghiepMoiComponent } from './Membership/doanh-nghiep/doanh-nghiep-moi/doanh-nghiep-moi.component';
import { DoanhNghiepProductCountComponent } from './membership/doanh-nghiep/doanh-nghiep-product-count/doanh-nghiep-product-count.component';
import { DoanhNghiepTaxCodeComponent } from './Membership/doanh-nghiep/doanh-nghiep-tax-code/doanh-nghiep-tax-code.component';
import { DoanhNghiepTimKiemComponent } from './Membership/doanh-nghiep/doanh-nghiep-tim-kiem/doanh-nghiep-tim-kiem.component';
import { DoanhNghiepComponent } from './Membership/doanh-nghiep/doanh-nghiep.component';
import { MembershipComponent } from './membership/membership.component';
import { NhanVienDetailComponent } from './membership/nhan-vien/nhan-vien-detail/nhan-vien-detail.component';
import { NhanVienComponent } from './membership/nhan-vien/nhan-vien.component';
import { PhanCongQuanLyComponent } from './Membership/nhan-vien/phan-cong-quan-ly/phan-cong-quan-ly.component';
import { PhanQuyenMenuComponent } from './membership/nhan-vien/phan-quyen-menu/phan-quyen-menu.component';
import { ThongTinCaNhanComponent } from './membership/nhan-vien/thong-tin-ca-nhan/thong-tin-ca-nhan.component';
import { VnptComponent } from './membership/nhan-vien/vnpt/vnpt.component';
import { UploadComponent } from './Membership/upload/upload.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { WorkListDetailComponent } from './work-list-detail/work-list-detail.component';
import { WorkListComponent } from './work-list/work-list.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  {
    path: 'Blog', component: BlogComponent,
  },
  {
    path: 'Blog', children: [
      {
        path: 'List', component: BlogComponent,
      },     
      {
        path: 'Info/:ID', component: BlogInfoComponent,
      },
    ]
  },
  {
    path: 'BlogCategory', component: BlogCategoryComponent,
  },
  {
    path: 'BlogCategory', children: [
      {
        path: 'List', component: BlogCategoryComponent,
      },     
      {
        path: 'Info/:ID', component: BlogCategoryInfoComponent,
      },
    ]
  },
  {
    path: 'DichVu', component: DichVuComponent,
  },
  {
    path: 'DichVu', children: [
      {
        path: 'List', component: DichVuComponent,
      },     
      {
        path: 'Info/:ID', component: DichVuInfoComponent,
      },
    ]
  },
  {
    path: 'ThanhVien', component: ThanhVienComponent,
  },
  {
    path: 'ThanhVien', children: [
      {
        path: 'List', component: ThanhVienComponent,
      },     
      {
        path: 'Info/:ID', component: ThanhVienInfoComponent,
      },
    ]
  },
  {
    path: 'Customer', component: CustomerComponent,
  },
  {
    path: 'Contact', component: ContactComponent,
  },
  {
    path: 'VNPTInfo', component: VNPTInfoComponent,
  },
  {
    path: 'Login', component: LoginComponent,
  },
  {
    path: 'WorkList', component: WorkListComponent,
  },
  {
    path: 'WorkList', children: [
      {
        path: 'List', component: WorkListComponent,
      },     
      {
        path: 'Detail/:ID', component: WorkListDetailComponent,
      },
    ]
  },
  {
    path: 'CongNgheThongTin', component: ChuKySoCAComponent,
  },
  {
    path: 'CongNgheThongTin', children: [
      {
        path: 'ChuKySoCA', component: ChuKySoCAComponent,
      },
      {
        path: 'BaoHiemXaHoi', component: BaoHiemXaHoiComponent,
      },
      {
        path: 'HoaDonDienTu', component: HoaDonDienTuComponent,
      },
    ]
  },
  {
    path: 'Dashboard', component: DashboardComponent,
  },
  {
    path: 'Dashboard', children: [
      {
        path: 'TongQuan', component: DashboardComponent,
      },
      {
        path: 'DoanhThuTongHop', component: DoanhThuTongHopComponent,
      },
      {
        path: 'DoanhThuTheoHuyen', component: DoanhThuTheoHuyenComponent,
      },
      {
        path: 'DoanhThuTheoDichVu', component: DoanhThuTheoDichVuComponent,
      },
      {
        path: 'DoanhThuChiTietTheoThang', component: DoanhThuChiTietTheoThangComponent,
      },
      {
        path: 'DoanhThuMoiTheoThang', component: DoanhThuMoiTheoThangComponent,
      },
    ]
  },
  {
    path: 'Invoice', component: InvoiceComponent,
  },
  {
    path: 'Invoice', children: [
      {
        path: 'InvoiceTimKiem', component: InvoiceTimKiemComponent,
      },
    ]
  },
  {
    path: 'AMPhieuYeuCau', component: AMPhieuYeuCauComponent,
  },
  {
    path: 'AMPhieuYeuCau', children: [
      {
        path: 'DanhSach', component: AMPhieuYeuCauDanhSachComponent,
      },
      {
        path: 'ListKyThuat', component: AMPhieuYeuCauListKyThuatComponent,
      },
      {
        path: 'Detail/:ID', component: AMPhieuYeuCauDetailComponent,
      },
      {
        path: 'Info/:ID', component: AMPhieuYeuCauInfoComponent,
      },
      {
        path: 'HoanThanh/:ID', component: AMPhieuYeuCauHoanThanhComponent,
      },
    ]
  },
  {
    path: 'Config', component: ConfigComponent,
  },
  {
    path: 'Config', children: [
      {
        path: 'ProductSub', component: ProductSubComponent,
      },
      {
        path: 'ProductGroup', component: ProductGroupComponent,
      },
      {
        path: 'ChucVu', component: ChucVuComponent,
      },
      {
        path: 'MenuLeft', component: MenuLeftComponent,
      },
      {
        path: 'Province', component: ProvinceComponent,
      },
      {
        path: 'City', component: CityComponent,
      },
      {
        path: 'Ward', component: WardComponent,
      },
      {
        path: 'LoaiBaiViet', component: LoaiBaiVietComponent,
      },
      {
        path: 'LoaiPhieuYeuCau', component: LoaiPhieuYeuCauComponent,
      },
      {
        path: 'MembershipType', component: MembershipTypeComponent,
      },
      {
        path: 'NganHang', component: NganHangComponent,
      },
      {
        path: 'Product', component: ProductComponent,
      },
      {
        path: 'Unit', component: UnitComponent,
      },
      {
        path: 'CustomerType', component: CustomerTypeComponent,
      },
      {
        path: 'AMHeThong', component: AMHeThongComponent,
      },
      {
        path: 'AMMauHoaDon', component: AMMauHoaDonComponent,
      },
      {
        path: 'AMMauSo', component: AMMauSoComponent,
      },
      {
        path: 'AMNgonNgu', component: AMNgonNguComponent,
      },
    ]
  },
  { path: 'Membership', component: MembershipComponent },
  {
    path: 'Membership', children: [
      { path: 'NhanVien', component: NhanVienComponent },
      {
        path: 'NhanVien', children: [
          { path: 'Detail/:ID', component: NhanVienDetailComponent },
        ]
      },
      { path: 'VNPT', component: VnptComponent },
      { path: 'ThongTinCaNhan', component: ThongTinCaNhanComponent },
      { path: 'PhanQuyenMenu', component: PhanQuyenMenuComponent },
      { path: 'PhanCongQuanLy', component: PhanCongQuanLyComponent },
      { path: 'Upload', component: UploadComponent },
      { path: 'DoanhNghiepCAHetHan', component: DoanhNghiepCAHetHanComponent },
      { path: 'DoanhNghiepCAGiaHan', component: DoanhNghiepCAGiaHanComponent },
      { path: 'DoanhNghiepCADangHoatDong', component: DoanhNghiepCADangHoatDongComponent },
      { path: 'DoanhNghiepCATaoMoi', component: DoanhNghiepCATaoMoiComponent },
      { path: 'DoanhNghiepCAMoi', component: DoanhNghiepCAMoiComponent },
      { path: 'DoanhNghiepDichVu', component: DoanhNghiepDichVuComponent },
      { path: 'DoanhNghiepMembershipCode', component: DoanhNghiepMembershipCodeComponent },
      { path: 'DoanhNghiepTaxCode', component: DoanhNghiepTaxCodeComponent },
      { path: 'DoanhNghiepTimKiem', component: DoanhNghiepTimKiemComponent },
      { path: 'DoanhNghiepProductCount', component: DoanhNghiepProductCountComponent },
      { path: 'DoanhNghiepLienHe', component: DoanhNghiepLienHeComponent },
      { path: 'DoanhNghiepMoi', component: DoanhNghiepMoiComponent },
      { path: 'DoanhNghiep', component: DoanhNghiepComponent },
      {
        path: 'DoanhNghiep', children: [
          { path: 'Detail/:ID', component: DoanhNghiepDetailComponent },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
