using VNPT2021.Helpers;
using System;
using System.Collections.Generic;

namespace VNPT2021.Data.Models
{
    public partial class Membership : BaseModel
    {
        public int? CategoryID { get; set; }
        public string FullName { get; set; }
        public string ShortName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Address { get; set; }
        public string CitizenIdentification { get; set; }
        public string Account { get; set; }
        public string Password { get; set; }
        public string GUICode { get; set; }
        public string TaxCode { get; set; }
        public int? ProvinceID { get; set; }
        public int? CityID { get; set; }
        public int? WardID { get; set; }
        public string MembershipCode { get; set; }
        public string ContactFullName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public string ContactChucVu { get; set; }
        public string ContactGiayUyQuyen { get; set; }
        public string Image { get; set; }
        public int? NganHangID { get; set; }
        public string NganHang_SoTaiKhoan { get; set; }
        public string NoiDungLienHe { get; set; }
        public int? NguoiLienHeID { get; set; }
        public int? NguoiXuLyID { get; set; }
        public bool? IsLienHe { get; set; }
        public bool? IsGiaHan { get; set; }
        public string Website { get; set; }
        public string Fax { get; set; }
        public bool? IsWebsite { get; set; }
        public string Description { get; set; }
        public string Skype { get; set; }
        public string SkypeDisplay { get; set; }
        public string SkypeHTML { get; set; }
        public string Facebook { get; set; }
        public string FacebookDisplay { get; set; }
        public string FacebookHTML { get; set; }
        public string Twitter { get; set; }
        public string TwitterDisplay { get; set; }
        public string TwitterHTML { get; set; }
        public string Instagram { get; set; }
        public string InstagramDisplay { get; set; }
        public string InstagramHTML { get; set; }
        public string PhoneDisplay { get; set; }
        public string PhoneHTML { get; set; }
        public string EmailDisplay { get; set; }
        public string EmailHTML { get; set; }
        public string GoogleMap { get; set; }
        public string GoogleMapDisplay { get; set; }
        public string GoogleMapHTML { get; set; }
        public string URLImage { get; set; }

    }
}
