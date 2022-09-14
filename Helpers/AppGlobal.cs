using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Net;
using System.Text;
using System.Text.RegularExpressions;
using System.Xml;

namespace VNPT2021.Helpers
{
    public class AppGlobal
    {
        #region Init

        #endregion

        #region AppSettings 
        public static string BlogHTML
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("BlogHTML").Value;
            }
        }
        public static string Blog
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Blog").Value;
            }
        }
        public static string Blogs
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Blogs").Value;
            }
        }
        public static string HopDongCungCapVaSuDungDichVuChungThucChuKySoCongCongVNPTCAFile
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("HopDongCungCapVaSuDungDichVuChungThucChuKySoCongCongVNPTCAFile").Value;
            }
        }
        public static string PhatTrien
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("PhatTrien").Value;
            }
        }
        public static string TiepCan
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("TiepCan").Value;
            }
        }
        public static string ChucVu
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("ChucVu").Value;
            }
        }
        public static string ProductSub
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("ProductSub").Value;
            }
        }
        public static string ProductGroup
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("ProductGroup").Value;
            }
        }
        public static string PhieuYeuCau
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("PhieuYeuCau").Value;
            }
        }
        public static string AMNgonNgu
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("AMNgonNgu").Value;
            }
        }
        public static string AMMauHoaDon
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("AMMauHoaDon").Value;
            }
        }
        public static string AMMauSo
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("AMMauSo").Value;
            }
        }
        public static string AMHeThong
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("AMHeThong").Value;
            }
        }
        public static string FileDinhKem
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("FileDinhKem").Value;
            }
        }
        public static string BackgroundImagePorttraitFileName
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("BackgroundImagePorttraitFileName").Value;
            }
        }
        public static string BackgroundImageLanscapeFileName
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("BackgroundImageLanscapeFileName").Value;
            }

        }
        public static string BackgroundImageURL
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("BackgroundImageURL").Value;
            }
        }
       
        public static string NgayIn
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("NgayIn").Value;
            }
        }
        public static string ContentWidth
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("ContentWidth").Value;
            }
        }
        public static string ContentHeight
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("ContentHeight").Value;
            }
        }
        public static string PageTitleHTML
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("PageTitleHTML").Value;
            }
        }
        public static string ContentTitle
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("ContentTitle").Value;
            }
        }
        public static string ContentTitleSub
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("ContentTitleSub").Value;
            }
        }
        public static string ContentDetail
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("ContentDetail").Value;
            }
        }
        public static string HeaderFile
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("HeaderFile").Value;
            }
        }
        public static string HTML
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("HTML").Value;
            }
        }
        public static string Download
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Download").Value;
            }
        }
        public static string PhanCongQuanLy
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("PhanCongQuanLy").Value;
            }
        }
        public static string Upload
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Upload").Value;
            }
        }
        public static string ImageFileURL
        {
            get
            {
                string result = DomainOnlineURL + Images + "/" + ImageFile;
                return result;
            }
        }
        public static string ImageFile
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("ImageFile").Value;
            }
        }
        public static string Membership
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Membership").Value;
            }
        }

        public static string Images
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Images").Value;
            }
        }
        public static string CustomerType
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("CustomerType").Value;
            }
        }
        public static string Unit
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Unit").Value;
            }
        }
        public static string LoaiPhieuYeuCau
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("LoaiPhieuYeuCau").Value;
            }
        }
        public static string LoaiBaiViet
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("LoaiBaiViet").Value;
            }
        }
        public static string Product
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Product").Value;
            }
        }
        public static string NganHang
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("NganHang").Value;
            }
        }
        public static string PhanQuyen
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("PhanQuyen").Value;
            }
        }
        public static string MembershipType
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("MembershipType").Value;
            }
        }
        public static string MenuLeft
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("MenuLeft").Value;
            }
        }
        public static string Ward
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Ward").Value;
            }
        }
        public static string City
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("City").Value;
            }
        }
        public static string Province
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Province").Value;
            }
        }
        public static string CRM
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("CRM").Value;
            }
        }
        public static int DoanhNghiepCAID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("DoanhNghiepCAID").Value);
            }
        }
        public static int DoanhNghiepID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("DoanhNghiepID").Value);
            }
        }
        public static int NhanVienID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("NhanVienID").Value);
            }
        }
        public static int QuanTriID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("QuanTriID").Value);
            }
        }
        public static int KyThuatID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("KyThuatID").Value);
            }
        }
        public static int UnitID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("UnitID").Value);
            }
        }
        public static int DateBegin
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("DateBegin").Value);
            }
        }
        public static int DateEnd
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("DateEnd").Value);
            }
        }
        public static int ContentWidthPorttrait
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("ContentWidthPorttrait").Value);
            }
        }
        public static int ContentWidthLanscape
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("ContentWidthLanscape").Value);
            }
        }
        public static int ContentHeightLanscape
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("ContentHeightLanscape").Value);
            }
        }
        public static int ContentHeightPorttrait
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("ContentHeightPorttrait").Value);
            }
        }
        public static int CAID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("CAID").Value);
            }
        }
        public static int BHXHID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("BHXHID").Value);
            }
        }
        public static int HoaDonDienTuID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("HoaDonDienTuID").Value);
            }
        }
        public static int PhiPhuThuID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("PhiPhuThuID").Value);
            }
        }
        public static int VNPTID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("VNPTID").Value);
            }
        }
        public static string SQLServerConectionString
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("SQLServerConectionString").Value;
            }
        }
        public static string DomainURL
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("DomainURL").Value;
            }
        }
        public static string DomainURLSub
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("DomainURLSub").Value;
            }
        }
        public static string DomainOnlineURL
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("DomainOnlineURL").Value;
            }
        }
        public static string APIURL
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("APIURL").Value;
            }
        }
        public static string DomainName
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("DomainName").Value;
            }
        }
        public static string PageTitle
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("PageTitle").Value;
            }
        }
        public static string PageDescription
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("PageDescription").Value;
            }
        }
        public static string PageKeywords
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("PageKeywords").Value;
            }
        }
        public static string PageTags
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("PageTags").Value;
            }
        }
        public static string LogoImageURL
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("LogoImageURL").Value;
            }
        }
        public static string Logo200ImageURL
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("LogoImageURL").Value;
            }
        }
        public static string HomepageImageURL
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("HomepageImageURL").Value;
            }
        }
        public static string Facebook
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Facebook").Value;
            }
        }
        public static string Twitter
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("Twitter").Value;
            }
        }
        public static int BlogCategoryGioiThieuID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("BlogCategoryGioiThieuID").Value);
            }
        }
        public static int BlogCategoryDichVuID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("BlogCategoryDichVuID").Value);
            }
        }
        public static int BlogCategoryTinTucID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("BlogCategoryTinTucID").Value);
            }
        }
        public static int BlogCategoryKhuyenMaiID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("BlogCategoryKhuyenMaiID").Value);
            }
        }
        public static int BlogCategoryKyThuatID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("BlogCategoryKyThuatID").Value);
            }
        }
        public static int BlogGioiThieuID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("BlogGioiThieuID").Value);
            }
        }
        public static int BlogChinhSachBaoMatID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("BlogChinhSachBaoMatID").Value);
            }
        }
        public static int BlogSuMenhTamNhinID
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("BlogSuMenhTamNhinID").Value);
            }
        }       
        public static string DonHangHTML
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("DonHangHTML").Value;
            }
        }
        public static string ContactHTML
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("ContactHTML").Value;
            }
        }
        public static string NewsletterHTML
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("NewsletterHTML").Value;
            }
        }
        public static string SMTPServer
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("SMTPServer").Value;
            }
        }
        public static int SMTPPort
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return int.Parse(builder.Build().GetSection("AppSettings").GetSection("SMTPPort").Value);
            }
        }
        public static string MasterEmailUser
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("MasterEmailUser").Value;
            }
        }
        public static string MasterEmailPassword
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("MasterEmailPassword").Value;
            }
        }
        public static string MasterEmailDisplay
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("MasterEmailDisplay").Value;
            }
        }
        public static string MasterEmailSubject
        {
            get
            {
                var builder = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile("appsettings.json", optional: true, reloadOnChange: true);
                return builder.Build().GetSection("AppSettings").GetSection("MasterEmailSubject").Value;
            }
        }
        #endregion
        #region Initialization
        public static string InitializationString
        {
            get
            {
                return "";
            }
        }
        public static DateTime InitializationDateTime
        {
            get
            {
                return DateTime.Now;
            }
        }
        public static string InitializationGUICode
        {
            get
            {
                return Guid.NewGuid().ToString();
            }
        }
        public static string InitializationDateTimeCode
        {
            get
            {
                return DateTime.Now.ToString("yyyyMMddHHmmss") + DateTime.Now.Ticks.ToString();
            }
        }
        public static string InitializationDateTimeCode0001
        {
            get
            {
                return DateTime.Now.ToString("yyyyMMddHHmmss");
            }
        }
        public static int InitializationNumber
        {
            get
            {
                return 0;
            }
        }
        #endregion
        #region Functions
        public static string SetImageFileName(string content)
        {
            content = content.Replace(@"'", @"""");
            content = content.Replace(@"src=""", "~");
            if (content.Split('~').Length > 1)
            {
                content = content.Split('~')[1];
                content = content.Split('"')[0];
            }
            else
            {
                content = AppGlobal.DomainURL + AppGlobal.Images + "/logo.png";
            }
            return content;
        }
        public static string DecodeEncodedNonAsciiCharacters(string value)
        {
            return System.Text.RegularExpressions.Regex.Replace(
                value,
                @"\\u(?<Value>[a-zA-Z0-9]{4})",
                m =>
                {
                    return ((char)int.Parse(m.Groups["Value"].Value, NumberStyles.HexNumber)).ToString();
                });
        }
        public static string InitializationURLCode(string URLCode)
        {
            URLCode = URLCode.Split('/')[URLCode.Split('/').Length - 1];
            URLCode = URLCode.Split('.')[0];
            URLCode = URLCode.Replace(@".html", @"");
            return URLCode;
        }
        public static string SetContent(string content)
        {
            string contentReturn = content;
            if (!string.IsNullOrEmpty(contentReturn))
            {
                contentReturn = contentReturn.Trim();                
                contentReturn = contentReturn.Replace(@"<html>", @"");
                contentReturn = contentReturn.Replace(@"</html>", @"");
                contentReturn = contentReturn.Replace(@"<head>", @"");
                contentReturn = contentReturn.Replace(@"</head>", @"");
                contentReturn = contentReturn.Replace(@"<title>", @"");
                contentReturn = contentReturn.Replace(@"</title>", @"");
                contentReturn = contentReturn.Replace(@"<body>", @"");
                contentReturn = contentReturn.Replace(@"</body>", @"");
            }
            return contentReturn;
        }
        public static string SetName(string fileName)
        {
            string fileNameReturn = fileName;
            if (!string.IsNullOrEmpty(fileNameReturn))
            {
                fileNameReturn = fileNameReturn.Trim();
                fileNameReturn = fileNameReturn.ToLower();
                fileNameReturn = fileNameReturn.Replace("’", "-");
                fileNameReturn = fileNameReturn.Replace("“", "-");
                fileNameReturn = fileNameReturn.Replace("--", "-");
                fileNameReturn = fileNameReturn.Replace("+", "-");
                fileNameReturn = fileNameReturn.Replace("/", "-");
                fileNameReturn = fileNameReturn.Replace(@"\", "-");
                fileNameReturn = fileNameReturn.Replace(":", "-");
                fileNameReturn = fileNameReturn.Replace(";", "-");
                fileNameReturn = fileNameReturn.Replace("%", "-");
                fileNameReturn = fileNameReturn.Replace("`", "-");
                fileNameReturn = fileNameReturn.Replace("~", "-");
                fileNameReturn = fileNameReturn.Replace("#", "-");
                fileNameReturn = fileNameReturn.Replace("$", "-");
                fileNameReturn = fileNameReturn.Replace("^", "-");
                fileNameReturn = fileNameReturn.Replace("&", "-");
                fileNameReturn = fileNameReturn.Replace("*", "-");
                fileNameReturn = fileNameReturn.Replace("(", "-");
                fileNameReturn = fileNameReturn.Replace(")", "-");
                fileNameReturn = fileNameReturn.Replace("|", "-");
                fileNameReturn = fileNameReturn.Replace("'", "-");
                fileNameReturn = fileNameReturn.Replace(",", "-");
                fileNameReturn = fileNameReturn.Replace(".", "-");
                fileNameReturn = fileNameReturn.Replace("?", "-");
                fileNameReturn = fileNameReturn.Replace("<", "-");
                fileNameReturn = fileNameReturn.Replace(">", "-");
                fileNameReturn = fileNameReturn.Replace("]", "-");
                fileNameReturn = fileNameReturn.Replace("[", "-");
                fileNameReturn = fileNameReturn.Replace(@"""", "-");
                fileNameReturn = fileNameReturn.Replace(@" ", "-");
                fileNameReturn = fileNameReturn.Replace("á", "a");
                fileNameReturn = fileNameReturn.Replace("à", "a");
                fileNameReturn = fileNameReturn.Replace("ả", "a");
                fileNameReturn = fileNameReturn.Replace("ã", "a");
                fileNameReturn = fileNameReturn.Replace("ạ", "a");
                fileNameReturn = fileNameReturn.Replace("ă", "a");
                fileNameReturn = fileNameReturn.Replace("ắ", "a");
                fileNameReturn = fileNameReturn.Replace("ằ", "a");
                fileNameReturn = fileNameReturn.Replace("ẳ", "a");
                fileNameReturn = fileNameReturn.Replace("ẵ", "a");
                fileNameReturn = fileNameReturn.Replace("ặ", "a");
                fileNameReturn = fileNameReturn.Replace("â", "a");
                fileNameReturn = fileNameReturn.Replace("ấ", "a");
                fileNameReturn = fileNameReturn.Replace("ầ", "a");
                fileNameReturn = fileNameReturn.Replace("ẩ", "a");
                fileNameReturn = fileNameReturn.Replace("ẫ", "a");
                fileNameReturn = fileNameReturn.Replace("ậ", "a");
                fileNameReturn = fileNameReturn.Replace("í", "i");
                fileNameReturn = fileNameReturn.Replace("ì", "i");
                fileNameReturn = fileNameReturn.Replace("ỉ", "i");
                fileNameReturn = fileNameReturn.Replace("ĩ", "i");
                fileNameReturn = fileNameReturn.Replace("ị", "i");
                fileNameReturn = fileNameReturn.Replace("ý", "y");
                fileNameReturn = fileNameReturn.Replace("ỳ", "y");
                fileNameReturn = fileNameReturn.Replace("ỷ", "y");
                fileNameReturn = fileNameReturn.Replace("ỹ", "y");
                fileNameReturn = fileNameReturn.Replace("ỵ", "y");
                fileNameReturn = fileNameReturn.Replace("ó", "o");
                fileNameReturn = fileNameReturn.Replace("ò", "o");
                fileNameReturn = fileNameReturn.Replace("ỏ", "o");
                fileNameReturn = fileNameReturn.Replace("õ", "o");
                fileNameReturn = fileNameReturn.Replace("ọ", "o");
                fileNameReturn = fileNameReturn.Replace("ô", "o");
                fileNameReturn = fileNameReturn.Replace("ố", "o");
                fileNameReturn = fileNameReturn.Replace("ồ", "o");
                fileNameReturn = fileNameReturn.Replace("ổ", "o");
                fileNameReturn = fileNameReturn.Replace("ỗ", "o");
                fileNameReturn = fileNameReturn.Replace("ộ", "o");
                fileNameReturn = fileNameReturn.Replace("ơ", "o");
                fileNameReturn = fileNameReturn.Replace("ớ", "o");
                fileNameReturn = fileNameReturn.Replace("ờ", "o");
                fileNameReturn = fileNameReturn.Replace("ở", "o");
                fileNameReturn = fileNameReturn.Replace("ỡ", "o");
                fileNameReturn = fileNameReturn.Replace("ợ", "o");
                fileNameReturn = fileNameReturn.Replace("ú", "u");
                fileNameReturn = fileNameReturn.Replace("ù", "u");
                fileNameReturn = fileNameReturn.Replace("ủ", "u");
                fileNameReturn = fileNameReturn.Replace("ũ", "u");
                fileNameReturn = fileNameReturn.Replace("ụ", "u");
                fileNameReturn = fileNameReturn.Replace("ư", "u");
                fileNameReturn = fileNameReturn.Replace("ứ", "u");
                fileNameReturn = fileNameReturn.Replace("ừ", "u");
                fileNameReturn = fileNameReturn.Replace("ử", "u");
                fileNameReturn = fileNameReturn.Replace("ữ", "u");
                fileNameReturn = fileNameReturn.Replace("ự", "u");
                fileNameReturn = fileNameReturn.Replace("é", "e");
                fileNameReturn = fileNameReturn.Replace("è", "e");
                fileNameReturn = fileNameReturn.Replace("ẻ", "e");
                fileNameReturn = fileNameReturn.Replace("ẽ", "e");
                fileNameReturn = fileNameReturn.Replace("ẹ", "e");
                fileNameReturn = fileNameReturn.Replace("ê", "e");
                fileNameReturn = fileNameReturn.Replace("ế", "e");
                fileNameReturn = fileNameReturn.Replace("ề", "e");
                fileNameReturn = fileNameReturn.Replace("ể", "e");
                fileNameReturn = fileNameReturn.Replace("ễ", "e");
                fileNameReturn = fileNameReturn.Replace("ệ", "e");
                fileNameReturn = fileNameReturn.Replace("đ", "d");
                fileNameReturn = fileNameReturn.Replace("--", "-");
            }
            return fileNameReturn;
        }
        public static string ConvertDecimalToString(decimal number)
        {
            string s = number.ToString("#");
            string[] so = new string[] { "không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín" };
            string[] hang = new string[] { "", "nghìn", "triệu", "tỷ" };
            int i, j, donvi, chuc, tram;
            string str = " ";
            bool booAm = false;
            decimal decS = 0;
            //Tung addnew
            try
            {
                decS = Convert.ToDecimal(s.ToString());
            }
            catch
            {
            }
            if (decS < 0)
            {
                decS = -decS;
                s = decS.ToString();
                booAm = true;
            }
            i = s.Length;
            if (i == 0)
                str = so[0] + str;
            else
            {
                j = 0;
                while (i > 0)
                {
                    donvi = Convert.ToInt32(s.Substring(i - 1, 1));
                    i--;
                    if (i > 0)
                        chuc = Convert.ToInt32(s.Substring(i - 1, 1));
                    else
                        chuc = -1;
                    i--;
                    if (i > 0)
                        tram = Convert.ToInt32(s.Substring(i - 1, 1));
                    else
                        tram = -1;
                    i--;
                    if ((donvi > 0) || (chuc > 0) || (tram > 0) || (j == 3))
                        str = hang[j] + str;
                    j++;
                    if (j > 3) j = 1;
                    if ((donvi == 1) && (chuc > 1))
                    {
                        if (str.Length > 0)
                        {
                            str = "mốt " + str;
                        }
                        else
                        {
                            str = "một " + str;
                        }
                    }
                    else
                    {
                        if ((donvi == 5) && (chuc > 0))
                            str = "lăm " + str;
                        else if (donvi > 0)
                            str = so[donvi] + " " + str;
                    }
                    if (chuc < 0)
                        break;
                    else
                    {
                        if ((chuc == 0) && (donvi > 0)) str = "lẻ " + str;
                        if (chuc == 1) str = "mười " + str;
                        if (chuc > 1) str = so[chuc] + " mươi " + str;
                    }
                    if (tram < 0) break;
                    else
                    {
                        if ((tram > 0) || (chuc > 0) || (donvi > 0)) str = so[tram] + " trăm " + str;
                    }
                    str = " " + str;
                }
            }
            if (booAm) str = "Âm " + str;
            return str + "đồng chẵn";
        }
        #endregion
    }
    public class YearMonth
    {
        public int Display { get; set; }
        public YearMonth()
        {
        }
        public static List<YearMonth> GetYearToList()
        {
            List<YearMonth> list = new List<YearMonth>();
            for (int i = AppGlobal.DateBegin; i <= AppGlobal.DateEnd; i++)
            {
                YearMonth model = new YearMonth();
                model.Display = i;
                list.Add(model);
            }
            return list;
        }
        public static List<YearMonth> GetMonthToList()
        {
            List<YearMonth> list = new List<YearMonth>();
            for (int i = 1; i <= 12; i++)
            {
                YearMonth model = new YearMonth();
                model.Display = i;
                list.Add(model);
            }
            return list;
        }
    }
}