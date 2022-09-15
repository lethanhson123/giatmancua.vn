using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Net;
using System.Net.Http;
using VNPT2021.Data.Models;
using VNPT2021.Data.Repositories;
using VNPT2021.Helpers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using VNPT2021.Data.DataTransfer;
using Microsoft.Net.Http.Headers;

namespace VNPT2021.API.Controllers
{

    public class MembershipController : BaseController
    {
        private readonly IWebHostEnvironment _hostingEnvironment;
        private readonly IMembershipRepository _membershipRepository;
        public MembershipController(IWebHostEnvironment hostingEnvironment, IMembershipRepository membershipRepository) : base()
        {
            _hostingEnvironment = hostingEnvironment;
            _membershipRepository = membershipRepository;
        }
        [HttpGet]
        public Membership GetByID(int ID)
        {
            Membership result = new Membership();
            result.FullName = AppGlobal.InitializationString;
            result.Email = AppGlobal.InitializationString;
            result.Address = AppGlobal.InitializationString;
            result.Phone = AppGlobal.InitializationString;
            result.Password = AppGlobal.InitializationString;
            result.Image = AppGlobal.ImageFileURL;
            result.ParentID = AppGlobal.NhanVienID;
            if (ID > 0)
            {
                result = _membershipRepository.GetByID(ID);
                if (result != null)
                {
                    result.URLImage = "https://api.giatmancua.vn/Images/Membership/" + result.Image;
                    result.GoogleMapDisplay = "https://www.google.com/maps/d/embed?mid=" + result.GoogleMap;
                }
            }
            return result;
        }
        [HttpGet]
        public Membership GetByIDString(string ID)
        {
            Membership result = new Membership();
            if (!string.IsNullOrEmpty(ID))
            {
                ID = AppGlobal.InitializationURLCode(ID);
                result = _membershipRepository.GetByID(int.Parse(ID));
                result.URLImage = "https://api.giatmancua.vn/Images/Membership/" + result.Image;
            }
            return result;
        }
        [HttpGet]
        public Membership GetVNPT()
        {
            Membership result = new Membership();
            result = _membershipRepository.GetByID(AppGlobal.VNPTID);
            result.URLImage = "https://api.giatmancua.vn/Images/Membership/" + result.Image;
            return result;
        }
        [HttpPut]
        public int Update(Membership model)
        {
            var result = 0;
            result = _membershipRepository.Update(model);
            return result;
        }
        [HttpDelete]
        public int RemoveByID(int ID)
        {
            var result = _membershipRepository.Remove(ID);
            return result;
        }
        [HttpGet]
        public Membership GetByAccountAndPassword(string account, string password)
        {
            Membership result = _membershipRepository.GetByAccountAndPassword(account, password);
            if (result != null)
            {
                result.Image = AppGlobal.DomainOnlineURL + AppGlobal.Images + "/" + AppGlobal.Membership + "/" + result.Image;
            }
            return result;
        }
        [HttpGet]
        public List<Membership> GetDoanhNghiepToList()
        {
            var result = _membershipRepository.GetByParentIDToList(AppGlobal.DoanhNghiepID);
            return result;
        }
        [HttpGet]
        public List<Membership> GetNhanVienToList()
        {
            var result = _membershipRepository.GetByParentIDToList(AppGlobal.NhanVienID);
            return result;
        }
        [HttpGet]
        public List<Membership> GetQuanTriToList()
        {
            var result = _membershipRepository.GetByParentIDToList(AppGlobal.QuanTriID);
            return result;
        }
        [HttpGet]
        public List<Membership> GetKyThuatToList()
        {
            var result = _membershipRepository.GetByParentIDToList(AppGlobal.KyThuatID);
            return result;
        }
        [HttpGet]
        public List<Membership> GetAllNhanVienToList()
        {
            List<Membership> list = new List<Membership>();
            list.AddRange(_membershipRepository.GetByParentIDToList(AppGlobal.NhanVienID));
            list.AddRange(_membershipRepository.GetByParentIDToList(AppGlobal.QuanTriID));
            list.AddRange(_membershipRepository.GetByParentIDToList(AppGlobal.KyThuatID));
            for (int i = 0; i < list.Count; i++)
            {
                list[i].URLImage = "https://api.giatmancua.vn/Images/Membership/" + list[i].Image;
            }
            return list;
        }
        [HttpGet]
        public List<Membership> GetByDoanhNghiepWithTaxCodeIsNullToList()
        {
            var result = _membershipRepository.GetByDoanhNghiepWithTaxCodeIsNullToList();
            return result;
        }
        [HttpGet]
        public List<Membership> GetByDoanhNghiepWithMembershipCodeIsNullToList()
        {
            var result = _membershipRepository.GetByDoanhNghiepWithMembershipCodeIsNullToList();
            return result;
        }
        [HttpGet]
        public List<Membership> GetDoanhNghiepByProductIDAndCityIDAndWardIDToList(int productID, int cityID, int wardID)
        {
            var result = _membershipRepository.GetByParentIDAndProductIDAndCityIDAndWardIDToList(AppGlobal.DoanhNghiepID, productID, cityID, wardID);
            return result;
        }
        [HttpGet]
        public List<Membership> GetDoanhNghiepByProductIDListAndCityIDAndWardIDToList(string productIDList, int cityID, int wardID)
        {
            List<Membership> result = new List<Membership>();
            result.AddRange(_membershipRepository.GetByParentIDAndProductIDListAndCityIDAndWardIDToList(AppGlobal.DoanhNghiepID, productIDList, cityID, wardID));
            return result;
        }
        [HttpGet]
        public List<Membership> GetDoanhNghiepKhongSuDungDichVuByProductIDAndCityIDAndWardIDToList(int productID, int cityID, int wardID)
        {
            var result = _membershipRepository.GetKhongSuDungDichVuByParentIDAndProductIDAndCityIDAndWardIDToList(AppGlobal.DoanhNghiepID, productID, cityID, wardID);
            return result;
        }
        [HttpGet]
        public List<Membership> GetDoanhNghiepKhongSuDungDichVuByProductIDListAndCityIDAndWardIDToList(string productIDList, int cityID, int wardID)
        {
            var result = _membershipRepository.GetKhongSuDungDichVuByParentIDAndProductIDListAndCityIDAndWardIDToList(AppGlobal.DoanhNghiepID, productIDList, cityID, wardID);
            return result;
        }
        [HttpGet]
        public List<Membership> GetDoanhNghiepByProductCountAndCityIDAndWardIDToList(int productCount, int cityID, int wardID)
        {
            var result = _membershipRepository.GetByParentIDAndProductCountAndCityIDAndWardIDToList(AppGlobal.DoanhNghiepID, productCount, cityID, wardID);
            return result;
        }
        [HttpGet]
        public List<Membership> GetByProductIDAndActiveToList(int productID, bool active)
        {
            var result = _membershipRepository.GetByProductIDAndActiveToList(productID, active);
            return result;
        }
        [HttpGet]
        public List<Membership> GetByParentIDAndActiveToList(int parentID, bool active)
        {
            var result = _membershipRepository.GetByParentIDAndActiveToList(parentID, active);
            return result;
        }
        [HttpGet]
        public List<MembershipDataTransfer> GetDoanhNghiepCAHetHanByDateEndAndCityIDToList(int year, int month, int cityID)
        {
            DateTime dateEnd = new DateTime(year, month, 1);
            var result = _membershipRepository.GetDoanhNghiepCAHetHanByDateEndAndCityIDToList(dateEnd, cityID);
            return result;
        }

        [HttpGet]
        public List<MembershipDataTransfer> GetDoanhNghiepByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToList(int cityID, int wardID, bool isLienHe, bool isGiaHan)
        {
            var result = _membershipRepository.GetByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToList(AppGlobal.DoanhNghiepID, cityID, wardID, isLienHe, isGiaHan);
            return result;
        }
        [HttpGet]
        public List<MembershipDataTransfer> GetDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDToList(int year, int month, int cityID, int wardID)
        {
            DateTime dateEnd = new DateTime(year, month, 1);
            var result = _membershipRepository.GetDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDToList(dateEnd, cityID, wardID);
            return result;
        }
        [HttpGet]
        public List<MembershipDataTransfer> GetDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDAndProductIDToList(int year, int month, int cityID, int wardID)
        {
            DateTime dateEnd = new DateTime(year, month, 1);
            var result = _membershipRepository.GetDoanhNghiepHetHanByDateEndAndCityIDAndWardIDAndProductIDToList(dateEnd, cityID, wardID, AppGlobal.CAID);
            return result;
        }

        [HttpGet]
        public List<MembershipDataTransfer> GetDoanhNghiepCATaoMoiByDateBeginAndCityIDAndWardIDAndProductIDToList(int year, int month, int cityID, int wardID)
        {
            DateTime dateBegin = new DateTime(year, month, 1);
            var result = _membershipRepository.GetDoanhNghiepTaoMoiByDateBeginAndCityIDAndWardIDAndProductIDToList(dateBegin, cityID, wardID, AppGlobal.CAID);
            return result;
        }
        [HttpGet]
        public List<MembershipDataTransfer> GetDoanhNghiepCAGiaHanByCityIDAndWardIDAndProductIDToList(int cityID, int wardID)
        {
            var result = _membershipRepository.GetDoanhNghiepGiaHanByCityIDAndWardIDAndProductIDToList(cityID, wardID, AppGlobal.CAID);
            return result;
        }
        [HttpGet]
        public List<MembershipDataTransfer> GetDoanhNghiepCADangHoatDongByDateEndAndCityIDAndWardIDAndProductIDToList(int cityID, int wardID)
        {
            DateTime dateEnd = AppGlobal.InitializationDateTime;
            var result = _membershipRepository.GetDoanhNghiepDangHoatDongByDateEndAndCityIDAndWardIDAndProductIDToList(dateEnd, cityID, wardID, AppGlobal.CAID);
            return result;
        }
        [HttpGet]
        public Membership GetByParentIDAndTaxCode(string taxCode)
        {
            var result = _membershipRepository.GetByParentIDAndTaxCode(AppGlobal.DoanhNghiepID, taxCode);
            return result;
        }
        [HttpPost]
        public int PostNhanVien()
        {
            var result = 0;
            Membership model = JsonConvert.DeserializeObject<Membership>(Request.Form["data"]);
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                if (file == null || file.Length == 0)
                {
                }
                if (file != null)
                {
                    string fileExtension = Path.GetExtension(file.FileName);
                    string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                    fileName = model.Phone + "_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                    string pathSub = AppGlobal.Images + "/" + AppGlobal.Membership;
                    var physicalPath = Path.Combine(_hostingEnvironment.WebRootPath, pathSub, fileName);
                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        model.Image = fileName;
                    }
                }
            }
            if (model.ID == 0)
            {
                result = _membershipRepository.Add(model);
            }
            else
            {
                Membership model001 = _membershipRepository.GetByID(model.ID);
                model001.FullName = model.FullName;
                model001.Email = model.Email;
                model001.Phone = model.Phone;
                model001.Password = model.Password;
                model001.ParentID = model.ParentID;
                model001.Account = model.Account;
                model001.Address = model.Address;
                result = _membershipRepository.Update(model001);
            }
            result = model.ID;
            return result;
        }
        [HttpPost]
        public int PostNhanVienByCRM()
        {
            var result = 0;
            Membership model = JsonConvert.DeserializeObject<Membership>(Request.Form["data"]);
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                if (file == null || file.Length == 0)
                {
                }
                if (file != null)
                {
                    string fileExtension = Path.GetExtension(file.FileName);
                    if (fileExtension.Contains("txt") == false)
                    {
                        string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                        fileName = model.Phone + "_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                        string pathSub = AppGlobal.Images + "/" + AppGlobal.Membership;
                        var physicalPath = Path.Combine(_hostingEnvironment.WebRootPath, pathSub, fileName);
                        using (var stream = new FileStream(physicalPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                            model.Image = fileName;
                        }
                    }
                }
            }
            if (model.ID == 0)
            {
                result = _membershipRepository.Add(model);
            }
            else
            {
                Membership model001 = _membershipRepository.GetByID(model.ID);
                model001.FullName = model.FullName;
                model001.Email = model.Email;
                model001.Phone = model.Phone;
                model001.PhoneDisplay = model.PhoneDisplay;
                model001.Description = model.Description;
                model001.IsWebsite = model.IsWebsite;
                if (!string.IsNullOrEmpty(model.Image))
                {
                    model001.Image = model.Image;
                    model001.URLImage = AppGlobal.DomainURL + AppGlobal.Images + "/" + AppGlobal.Membership + "/" + model001.Image;
                }
                result = _membershipRepository.Update(model001);
            }
            result = model.ID;
            return result;
        }
        [HttpPost]
        public int PostDoanhNghiep(Membership model)
        {
            var result = 0;
            model.ParentID = AppGlobal.DoanhNghiepID;
            model.Active = true;
            if (model.ID == 0)
            {
                result = _membershipRepository.Add(model);
            }
            else
            {
                Membership model001 = _membershipRepository.GetByID(model.ID);
                model001.FullName = model.FullName;
                model001.TaxCode = model.TaxCode;
                model001.MembershipCode = model.MembershipCode;
                model001.Phone = model.Phone;
                model001.Address = model.Address;
                model001.ContactFullName = model.ContactFullName;
                model001.ContactPhone = model.ContactPhone;
                model001.Email = model.Email;
                model001.NganHang_SoTaiKhoan = model.NganHang_SoTaiKhoan;
                model001.CategoryID = model.CategoryID;
                model001.NganHangID = model.NganHangID;
                model001.WardID = model.WardID;
                model001.CityID = model.CityID;
                model001.ProvinceID = model.ProvinceID;
                model001.NguoiLienHeID = model.NguoiLienHeID;
                model001.NguoiXuLyID = model.NguoiXuLyID;
                model001.NoiDungLienHe = model.NoiDungLienHe;
                model001.IsLienHe = model.IsLienHe;
                model001.IsGiaHan = model.IsGiaHan;
                model001.Active = model.Active;
                result = _membershipRepository.Update(model001);
            }
            result = model.ID;
            return result;
        }
        [HttpPost]
        public int PostVNPT()
        {
            var result = 0;
            Membership model = JsonConvert.DeserializeObject<Membership>(Request.Form["data"]);
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                if (file == null || file.Length == 0)
                {
                }
                if (file != null)
                {
                    string fileExtension = Path.GetExtension(file.FileName);
                    string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                    fileName = model.Phone + "_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                    string pathSub = AppGlobal.Images + "/" + AppGlobal.Membership;
                    var physicalPath = Path.Combine(_hostingEnvironment.WebRootPath, pathSub, fileName);
                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                        model.Image = fileName;
                    }
                }
            }
            if (string.IsNullOrEmpty(model.FullName))
            {
                model.FullName = AppGlobal.InitializationString;
            }
            if (string.IsNullOrEmpty(model.TaxCode))
            {
                model.TaxCode = AppGlobal.InitializationString;
            }
            if (string.IsNullOrEmpty(model.Phone))
            {
                model.Phone = AppGlobal.InitializationString;
            }
            if (string.IsNullOrEmpty(model.Email))
            {
                model.Email = AppGlobal.InitializationString;
            }
            if (string.IsNullOrEmpty(model.Website))
            {
                model.Website = AppGlobal.InitializationString;
            }
            if (string.IsNullOrEmpty(model.Address))
            {
                model.Address = AppGlobal.InitializationString;
            }
            if (string.IsNullOrEmpty(model.ContactFullName))
            {
                model.ContactFullName = AppGlobal.InitializationString;
            }
            if (string.IsNullOrEmpty(model.ContactChucVu))
            {
                model.ContactChucVu = AppGlobal.InitializationString;
            }
            if (string.IsNullOrEmpty(model.ContactGiayUyQuyen))
            {
                model.ContactGiayUyQuyen = AppGlobal.InitializationString;
            }
            if (string.IsNullOrEmpty(model.NganHang_SoTaiKhoan))
            {
                model.NganHang_SoTaiKhoan = AppGlobal.InitializationString;
            }
            if (string.IsNullOrEmpty(model.Image))
            {
                model.Image = AppGlobal.InitializationString;
            }
            if (model.ID == 0)
            {
                result = _membershipRepository.Add(model);
            }
            else
            {
                Membership model001 = _membershipRepository.GetByID(model.ID);
                model001.FullName = model.FullName;
                model001.TaxCode = model.TaxCode;
                model001.Phone = model.Phone;
                model001.Email = model.Email;
                model001.Website = model.Website;
                model001.Address = model.Address;
                model001.ContactFullName = model.ContactFullName;
                model001.ContactChucVu = model.ContactChucVu;
                model001.ContactGiayUyQuyen = model.ContactGiayUyQuyen;
                model001.NganHang_SoTaiKhoan = model.NganHang_SoTaiKhoan;
                model001.NganHangID = model.NganHangID;
                model001.Image = model.Image;
                result = _membershipRepository.Update(model001);
            }
            result = model.ID;
            return result;
        }
        [HttpPost]
        public int PostVNPTByCRM()
        {
            var result = 0;
            Membership model = JsonConvert.DeserializeObject<Membership>(Request.Form["data"]);
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];
                if (file == null || file.Length == 0)
                {
                }
                if (file != null)
                {
                    string fileExtension = Path.GetExtension(file.FileName);
                    if (fileExtension.Contains("txt") == false)
                    {
                        string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                        fileName = model.Phone + "_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                        string pathSub = AppGlobal.Images + "/" + AppGlobal.Membership;
                        var physicalPath = Path.Combine(_hostingEnvironment.WebRootPath, pathSub, fileName);
                        using (var stream = new FileStream(physicalPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                            model.Image = fileName;
                        }
                    }
                }
            }

            if (model.ID == 0)
            {
                result = _membershipRepository.Add(model);
            }
            else
            {
                Membership model001 = _membershipRepository.GetByID(model.ID);
                model001.FullName = model.FullName;
                model001.ShortName = model.ShortName;
                model001.Phone = model.Phone;
                model001.PhoneDisplay = model.PhoneDisplay;
                model001.Email = model.Email;
                model001.Address = model.Address;
                model001.Facebook = model.Facebook;
                model001.Twitter = model.Twitter;
                model001.Instagram = model.Instagram;
                model001.GoogleMap = model.GoogleMap;
                model001.Account = model.Account;
                model001.Password = model.Password;
                if (!string.IsNullOrEmpty(model.Image))
                {
                    model001.Image = model.Image;
                    model001.URLImage = AppGlobal.DomainURL + AppGlobal.Images + "/" + AppGlobal.Membership + "/" + model001.Image;
                }
                result = _membershipRepository.Update(model001);
            }
            result = model.ID;
            return result;
        }
    }
}
