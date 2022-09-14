using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class AM_PhieuYeuCau_Detail_ViewModel
    {
        public int ID { get; set; }
        public int? UserCreated { get; set; }
        public DateTime? DateCreated { get; set; }
        public int? UserUpdated { get; set; }
        public DateTime? DateUpdated { get; set; }
        public int? ParentID { get; set; }
        public string Note { get; set; }
        public bool? Active { get; set; }
        public DateTime? NgayTao { get; set; }
        public string TieuDe { get; set; }
        public string NoiDung { get; set; }
        public string KetQua { get; set; }
        public int? NguoiTaoID { get; set; }
        public int? NguoiNhanID { get; set; }
        public int? PhongBanID { get; set; }
        public int? ProductID { get; set; }
        public bool? DaGui { get; set; }
        public bool? DaNhan { get; set; }
        public bool? DangXuLy { get; set; }
        public bool? HoanThanh { get; set; }
        public string TaxCode { get; set; }
        public int? KhachHangID { get; set; }
        public string NguoiTao { get; set; }
        public string DienThoai { get; set; }
        public string Email { get; set; }
        public int? HeThongID { get; set; }
        public int? MauHoaDonID { get; set; }
        public int? MauSoID { get; set; }
        public string KyHieu { get; set; }
        public string HeThong { get; set; }
        public string MauHoaDon { get; set; }
        public string MauSo { get; set; }
        public int? SoLuongHoaDon { get; set; }
        public int? NgonNguID { get; set; }
        public int? ThuTu { get; set; }
        public string NgonNgu { get; set; }
        public int? CategoryID { get; set; }
        public string FullName { get; set; }        
        public string Phone { get; set; }
        public string Address { get; set; }        
        public int? ProvinceID { get; set; }
        public int? CityID { get; set; }
        public int? WardID { get; set; }
        public string MembershipCode { get; set; }
        public string ContactFullName { get; set; }
        public string ContactPhone { get; set; }
        public int? NganHangID { get; set; }
        public string NganHang_SoTaiKhoan { get; set; }
    }
}
