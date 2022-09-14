using VNPT2021.Data.Helpers;
using VNPT2021.Data.Models;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using VNPT2021.Helpers;
using VNPT2021.Data.DataTransfer;

namespace VNPT2021.Data.Repositories
{
    public class MembershipRepository : Repository<Membership>, IMembershipRepository
    {
        private readonly VNPTContext _context;

        public MembershipRepository(VNPTContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(Membership model)
        {
            if (model.DateCreated == null)
            {
                model.DateCreated = AppGlobal.InitializationDateTime;
            }
            if (model.DateUpdated == null)
            {
                model.DateUpdated = AppGlobal.InitializationDateTime;
            }
            if (model.Active == null)
            {
                model.Active = false;
            }
            if (string.IsNullOrEmpty(model.GUICode))
            {
                model.GUICode = AppGlobal.InitializationGUICode;
            }
            if (string.IsNullOrEmpty(model.Password))
            {
                model.Password = "0";
            }
            if (!string.IsNullOrEmpty(model.FullName))
            {
                model.FullName = model.FullName.Trim();
                model.FullName = model.FullName.Replace(@"""", @"");
            }
            if (!string.IsNullOrEmpty(model.TaxCode))
            {
                model.TaxCode = model.TaxCode.Trim();
                model.TaxCode = model.TaxCode.Replace(@"""", @"");
            }
            //if (!string.IsNullOrEmpty(model.Phone))
            //{
            //    model.PhoneHTML = @"<a title='" + model.Phone + "' href='tel:" + model.Phone + "'>" + model.PhoneDisplay + "</a>";
            //}
            //if (!string.IsNullOrEmpty(model.Email))
            //{
            //    model.EmailHTML = @"<a title='" + model.Email + "' target='_blank' href='https://mail.google.com/mail/u/0/?view=cm&fs=1&to=" + model.Email + "&su=Hi_" + model.Email + "&body=&tf=1'>" + model.Email + "</a>";
            //}
            //if (!string.IsNullOrEmpty(model.Email))
            //{
            //    model.EmailHTML = @"<a title='" + model.Email + "' target='_blank' href='https://mail.google.com/mail/u/0/?view=cm&fs=1&to=" + model.Email + "&su=Hi_" + model.Email + "&body=&tf=1'>" + model.Email + "</a>";
            //}
        }
        private static void EncryptPassword(Membership model)
        {
            model.Password = SecurityHelper.Encrypt(model.GUICode, model.Password);
        }
        public static void DecryptPassword(Membership model)
        {
            model.Password = SecurityHelper.Decrypt(model.GUICode, model.Password);
        }
        private int Check(Membership model)
        {
            int result = 0;
            Membership modelPhone = new Membership();
            //if (!string.IsNullOrEmpty(model.Phone))
            //{
            //    modelPhone = _context.Set<Membership>().FirstOrDefault(item => item.Phone == model.Phone);
            //    if (modelPhone != null)
            //    {
            //        result = result + 1;
            //    }
            //}
            //if (!string.IsNullOrEmpty(model.Email))
            //{
            //    modelPhone = _context.Set<Membership>().FirstOrDefault(item => item.Email == model.Email);
            //    if (modelPhone != null)
            //    {
            //        result = result + 1;
            //    }
            //}           
            return result;
        }
        public override int Add(Membership model)
        {
            int result = 0;
            result = Check(model);
            if (result == 0)
            {
                Initialization(model);
                EncryptPassword(model);
                _context.Set<Membership>().Add(model);
                result = _context.SaveChanges();
            }
            return result;
        }
        public override int Update(Membership model)
        {
            Membership existModel = GetByID(model.ID);
            if (existModel != null)
            {
                if (model.Password != existModel.Password)
                {
                    EncryptPassword(model);
                }
                existModel = model;
                _context.Set<Membership>().Update(existModel);
            }
            return _context.SaveChanges();
        }
        public Membership GetByAccountAndPassword(string account, string password)
        {
            bool check = false;
            Membership membership = new Membership();
            if ((!string.IsNullOrEmpty(account)) && (!string.IsNullOrEmpty(password)))
            {
                membership = _context.Set<Membership>().FirstOrDefault(user => user.ParentID != AppGlobal.DoanhNghiepID && user.Phone.Equals(account));
                if (membership == null)
                {
                    membership = _context.Set<Membership>().FirstOrDefault(user => user.ParentID != AppGlobal.DoanhNghiepID && user.Email.Equals(account));
                }
                if (membership == null)
                {
                    membership = _context.Set<Membership>().FirstOrDefault(user => user.ParentID != AppGlobal.DoanhNghiepID && user.Account.Equals(account));
                }
                if (membership != null)
                {
                    string passwordDecrypt = SecurityHelper.Decrypt(membership.GUICode, membership.Password);
                    if (passwordDecrypt.Equals(password))
                    {
                        check = true;
                    }
                }

            }
            if (check == false)
            {
                membership = new Membership();
            }
            return membership;
        }
        public Membership GetByParentIDAndTaxCode(int parentID, string taxCode)
        {
            Membership result = _context.Set<Membership>().FirstOrDefault(model => model.ParentID == parentID && model.TaxCode == taxCode);
            if (result == null)
            {
                result = new Membership();
            }
            return result;
        }
        public Membership GetByTaxCode(string taxCode)
        {
            Membership result = _context.Set<Membership>().FirstOrDefault(model => model.TaxCode == taxCode);
            if (result == null)
            {
                result = new Membership();
            }
            return result;
        }
        public Membership GetByVNPTID()
        {
            Membership result = _context.Set<Membership>().FirstOrDefault(model => model.ID == AppGlobal.VNPTID);
            if (result == null)
            {
                result = new Membership();
            }
            return result;
        }
        public List<Membership> GetByDoanhNghiepWithTaxCodeIsNullToList()
        {
            var result = _context.Set<Membership>().Where(model => model.ParentID == AppGlobal.DoanhNghiepID && (model.TaxCode == null || model.TaxCode.Length == 0)).ToList();
            return result;
        }
        public List<Membership> GetByDoanhNghiepWithMembershipCodeIsNullToList()
        {
            var result = _context.Set<Membership>().Where(model => model.ParentID == AppGlobal.DoanhNghiepID && (model.MembershipCode == null || model.MembershipCode.Length == 0)).ToList();
            return result;
        }
        public List<Membership> GetByParentIDIDAndCityIDToList(int parentID, int cityID)
        {
            List<Membership> list = new List<Membership>();
            list = _context.Set<Membership>().Where(model => model.ParentID == parentID && model.CityID == cityID).ToList();
            return list;
        }
        public List<Membership> GetByParentIDAndIsWebsiteToList(int parentID, bool isWebsite)
        {
            List<Membership> list = new List<Membership>();
            list = _context.Set<Membership>().Where(model => model.ParentID == parentID && model.IsWebsite == isWebsite).ToList();
            return list;
        }
        public List<Membership> GetByNhanVienAndIsWebsiteToList(bool isWebsite)
        {
            List<Membership> list = new List<Membership>();
            list = _context.Set<Membership>().Where(model => (model.ParentID == AppGlobal.NhanVienID || model.ParentID == AppGlobal.QuanTriID || model.ParentID == AppGlobal.KyThuatID) && model.IsWebsite == isWebsite).ToList();           
            return list;
        }
        public List<Membership> GetByParentIDAndWardIDToList(int parentID, int wardID)
        {
            List<Membership> list = new List<Membership>();
            list = _context.Set<Membership>().Where(model => model.ParentID == parentID && model.WardID == wardID).ToList();
            return list;
        }
        public List<Membership> GetByParentIDAndProductIDToList(int parentID, int productID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductID",productID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByParentIDAndProductID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetByParentIDAndProductIDAndCityIDToList(int parentID, int productID, int cityID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductID",productID),
                new SqlParameter("@CityID",cityID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByParentIDAndProductIDAndCityID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetByParentIDAndProductIDAndWardIDToList(int parentID, int productID, int wardID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductID",productID),
                new SqlParameter("@WardID",wardID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByParentIDAndProductIDAndWardID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetByParentIDAndProductIDListToList(int parentID, string productIDList)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductIDList",productIDList),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByParentIDAndProductIDList", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetByParentIDAndProductIDListAndCityIDToList(int parentID, string productIDList, int cityID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                 new SqlParameter("@ProductIDList",productIDList),
                new SqlParameter("@CityID",cityID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByParentIDAndProductIDListAndCityID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetByParentIDAndProductIDListAndWardIDToList(int parentID, string productIDList, int wardID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductIDList",productIDList),
                new SqlParameter("@WardID",wardID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByParentIDAndProductIDListAndWardID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetByParentIDAndActiveToList(int parentID, bool active)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@Active",active),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByParentIDAndActive", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetByProductIDAndActiveToList(int productID, bool active)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ProductID",productID),
                new SqlParameter("@Active",active),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByProductIDAndActive", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetKhongSuDungDichVuByParentIDToList(int parentID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectKhongSuDungDichVuByParentID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetKhongSuDungDichVuByParentIDAndCityIDToList(int parentID, int cityID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@CityID",cityID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectKhongSuDungDichVuByParentIDAndCityID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetKhongSuDungDichVuByParentIDAndWardIDToList(int parentID, int wardID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@WardID",wardID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectKhongSuDungDichVuByParentIDAndWardID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetKhongSuDungDichVuByParentIDAndProductIDToList(int parentID, int productID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductID",productID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectKhongSuDungDichVuByParentIDAndProductID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetKhongSuDungDichVuByParentIDAndProductIDAndCityIDToList(int parentID, int productID, int cityID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductID",productID),
                new SqlParameter("@CityID",cityID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectKhongSuDungDichVuByParentIDAndProductIDAndCityID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetKhongSuDungDichVuByParentIDAndProductIDAndWardIDToList(int parentID, int productID, int wardID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductID",productID),
                new SqlParameter("@WardID",wardID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectKhongSuDungDichVuByParentIDAndProductIDAndWardID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetKhongSuDungDichVuByParentIDAndProductIDListToList(int parentID, string productIDList)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductIDList",productIDList),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectKhongSuDungDichVuByParentIDAndProductIDList", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetKhongSuDungDichVuByParentIDAndProductIDListAndCityIDToList(int parentID, string productIDList, int cityID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductIDList",productIDList),
                new SqlParameter("@CityID",cityID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectKhongSuDungDichVuByParentIDAndProductIDListAndCityID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetKhongSuDungDichVuByParentIDAndProductIDListAndWardIDToList(int parentID, string productIDList, int wardID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductIDList",productIDList),
                new SqlParameter("@WardID",wardID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectKhongSuDungDichVuByParentIDAndProductIDListAndWardID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetByParentIDAndProductCountToList(int parentID, int productCount)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductCount",productCount),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByParentIDAndProductCount", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetByParentIDAndProductCountAndCityIDToList(int parentID, int productCount, int cityID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@ProductCount",productCount),
                new SqlParameter("@CityID",cityID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByParentIDAndProductCountAndCityID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<Membership> GetByParentIDAndProductCountAndWardIDToList(int parentID, int productCount, int wardID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                 new SqlParameter("@ProductCount",productCount),
                new SqlParameter("@WardID",wardID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByParentIDAndProductCountAndWardID", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<MembershipDataTransfer> GetByParentIDIDAndCityIDAndIsLienHeAndIsGiaHanToList(int parentID, int cityID, bool isLienHe, bool isGiaHan)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            SqlParameter[] parameters =
              {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@CityID",cityID),
                new SqlParameter("@IsLienHe",isLienHe),
                new SqlParameter("@IsGiaHan",isGiaHan),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDataTransferByParentIDAndCityIDAndIsLienHeAndIsGiaHan", parameters);
            list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            return list;
        }
        public List<MembershipDataTransfer> GetByParentIDIDAndWardIDAndIsLienHeAndIsGiaHanToList(int parentID, int wardID, bool isLienHe, bool isGiaHan)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            SqlParameter[] parameters =
             {
                new SqlParameter("@ParentID",parentID),
                new SqlParameter("@WardID",wardID),
                new SqlParameter("@IsLienHe",isLienHe),
                new SqlParameter("@IsGiaHan",isGiaHan),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDataTransferByParentIDAndWardIDAndIsLienHeAndIsGiaHan", parameters);
            list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            return list;
        }
        public List<MembershipDataTransfer> GetByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToList(int parentID, int cityID, int wardID, bool isLienHe, bool isGiaHan)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (cityID > 0)
            {
                if (wardID > 0)
                {
                    list = GetByParentIDIDAndWardIDAndIsLienHeAndIsGiaHanToList(parentID, wardID, isLienHe, isGiaHan);
                }
                else
                {
                    list = GetByParentIDIDAndCityIDAndIsLienHeAndIsGiaHanToList(parentID, cityID, isLienHe, isGiaHan);
                }
            }
            return list;
        }
        public List<Membership> GetByParentIDAndProductIDAndCityIDAndWardIDToList(int parentID, int productID, int cityID, int wardID)
        {
            List<Membership> list = new List<Membership>();
            if (productID > 0)
            {
                if (cityID > 0)
                {
                    if (wardID > 0)
                    {
                        list = GetByParentIDAndProductIDAndWardIDToList(parentID, productID, wardID);
                    }
                    else
                    {
                        list = GetByParentIDAndProductIDAndCityIDToList(parentID, productID, cityID);
                    }
                }
                else
                {
                    list = GetByParentIDAndProductIDToList(parentID, productID);
                }
            }
            else
            {
                if (cityID > 0)
                {
                    if (wardID > 0)
                    {
                        list = GetByParentIDAndWardIDToList(parentID, wardID);
                    }
                    else
                    {
                        list = GetByParentIDIDAndCityIDToList(parentID, cityID);
                    }
                }
                else
                {
                    list = GetByParentIDToList(parentID);
                }
            }
            return list;
        }

        public List<Membership> GetByParentIDAndProductIDListAndCityIDAndWardIDToList(int parentID, string productIDList, int cityID, int wardID)
        {
            List<Membership> list = new List<Membership>();
            if (!string.IsNullOrEmpty(productIDList))
            {
                if (cityID > 0)
                {
                    if (wardID > 0)
                    {
                        list = GetByParentIDAndProductIDListAndWardIDToList(parentID, productIDList, wardID);
                    }
                    else
                    {
                        list = GetByParentIDAndProductIDListAndCityIDToList(parentID, productIDList, cityID);
                    }
                }
                else
                {
                    list = GetByParentIDAndProductIDListToList(parentID, productIDList);
                }
            }
            else
            {
                if (cityID > 0)
                {
                    if (wardID > 0)
                    {
                        list = GetByParentIDAndWardIDToList(parentID, wardID);
                    }
                    else
                    {
                        list = GetByParentIDIDAndCityIDToList(parentID, cityID);
                    }
                }
                else
                {
                    list = GetByParentID001ToList(parentID);
                }
            }
            return list;
        }
        public List<Membership> GetKhongSuDungDichVuByParentIDAndProductIDAndCityIDAndWardIDToList(int parentID, int productID, int cityID, int wardID)
        {
            List<Membership> list = new List<Membership>();
            if (productID > 0)
            {
                if (cityID > 0)
                {
                    if (wardID > 0)
                    {
                        list = GetKhongSuDungDichVuByParentIDAndProductIDAndWardIDToList(parentID, productID, wardID);
                    }
                    else
                    {
                        list = GetKhongSuDungDichVuByParentIDAndProductIDAndCityIDToList(parentID, productID, cityID);
                    }
                }
                //else
                //{
                //    list = GetKhongSuDungDichVuByParentIDAndProductIDToList(parentID, productID);
                //}
            }
            //else
            //{
            //    if (cityID > 0)
            //    {
            //        if (wardID > 0)
            //        {
            //            list = GetKhongSuDungDichVuByParentIDAndCityIDToList(parentID, wardID);
            //        }
            //        else
            //        {
            //            list = GetKhongSuDungDichVuByParentIDAndWardIDToList(parentID, cityID);
            //        }
            //    }
            //    else
            //    {
            //        list = GetKhongSuDungDichVuByParentIDToList(parentID);
            //    }
            //}
            return list;
        }
        public List<Membership> GetKhongSuDungDichVuByParentIDAndProductIDListAndCityIDAndWardIDToList(int parentID, string productIDList, int cityID, int wardID)
        {
            List<Membership> list = new List<Membership>();
            if (!string.IsNullOrEmpty(productIDList))
            {
                if (cityID > 0)
                {
                    if (wardID > 0)
                    {
                        list = GetKhongSuDungDichVuByParentIDAndProductIDListAndWardIDToList(parentID, productIDList, wardID);
                    }
                    else
                    {
                        list = GetKhongSuDungDichVuByParentIDAndProductIDListAndCityIDToList(parentID, productIDList, cityID);
                    }
                }
                else
                {
                    list = GetKhongSuDungDichVuByParentIDAndProductIDListToList(parentID, productIDList);
                }
            }
            return list;
        }
        public List<Membership> GetByParentIDAndProductCountAndCityIDAndWardIDToList(int parentID, int productCount, int cityID, int wardID)
        {
            List<Membership> list = new List<Membership>();
            if (productCount > 0)
            {
                if (cityID > 0)
                {
                    if (wardID > 0)
                    {
                        list = GetByParentIDAndProductCountAndWardIDToList(parentID, productCount, wardID);
                    }
                    else
                    {
                        list = GetByParentIDAndProductCountAndCityIDToList(parentID, productCount, cityID);
                    }
                }
                else
                {
                    list = GetByParentIDAndProductCountToList(parentID, productCount);
                }
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepCAHetHanByDateEndToList(DateTime dateEnd)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@DateEnd",dateEnd),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepCAHetHanByDateEnd", parameters);
            list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            return list;
        }
        public List<Membership> GetByParentID001ToList(int parentID)
        {
            List<Membership> list = new List<Membership>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ParentID",parentID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectByParentID001", parameters);
            list = SQLHelper.ToList<Membership>(dt);
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepCAHetHanByDateEndAndCityIDToList(DateTime dateEnd, int cityID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (cityID == 0)
            {
                list = GetDoanhNghiepCAHetHanByDateEndToList(dateEnd);
            }
            else
            {
                SqlParameter[] parameters =
                   {
                new SqlParameter("@DateEnd",dateEnd),
                new SqlParameter("@CityID",cityID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepCAHetHanByDateEndAndCityID", parameters);
                list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepCAHetHanByDateEndAndWardIDToList(DateTime dateEnd, int wardID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (wardID > 0)
            {
                SqlParameter[] parameters =
                   {
                new SqlParameter("@DateEnd",dateEnd),
                new SqlParameter("@WardID",wardID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepCAHetHanByDateEndAndWardID", parameters);
                list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDToList(DateTime dateEnd, int cityID, int wardID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (wardID > 0)
            {
                list = GetDoanhNghiepCAHetHanByDateEndAndWardIDToList(dateEnd, wardID);
            }
            else
            {
                list = GetDoanhNghiepCAHetHanByDateEndAndCityIDToList(dateEnd, cityID);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepHetHanByDateEndAndProductIDToList(DateTime dateEnd, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@DateEnd",dateEnd),
                new SqlParameter("@ProductID",productID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepHetHanByDateEndAndProductID", parameters);
            list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepHetHanByDateEndAndCityIDAndProductIDToList(DateTime dateEnd, int cityID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (cityID == 0)
            {
                list = GetDoanhNghiepHetHanByDateEndAndProductIDToList(dateEnd, productID);
            }
            else
            {
                SqlParameter[] parameters =
                   {
                new SqlParameter("@DateEnd",dateEnd),
                new SqlParameter("@CityID",cityID),
                new SqlParameter("@ProductID",productID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepHetHanByDateEndAndCityIDAndProductID", parameters);
                list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepHetHanByDateEndAndWardIDAndProductIDToList(DateTime dateEnd, int wardID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (wardID > 0)
            {
                SqlParameter[] parameters =
                   {
                new SqlParameter("@DateEnd",dateEnd),
                new SqlParameter("@WardID",wardID),
                new SqlParameter("@ProductID",productID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepHetHanByDateEndAndWardIDAndProductID", parameters);
                list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepHetHanByDateEndAndCityIDAndWardIDAndProductIDToList(DateTime dateEnd, int cityID, int wardID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (wardID > 0)
            {
                list = GetDoanhNghiepHetHanByDateEndAndWardIDAndProductIDToList(dateEnd, wardID, productID);
            }
            else
            {
                list = GetDoanhNghiepHetHanByDateEndAndCityIDAndProductIDToList(dateEnd, cityID, productID);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepTaoMoiByDateBeginAndProductIDToList(DateTime dateBegin, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@DateBegin",dateBegin),
                new SqlParameter("@ProductID",productID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepTaoMoiByDateBeginAndProductID", parameters);
            list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepTaoMoiByDateBeginAndCityIDAndProductIDToList(DateTime dateBegin, int cityID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (cityID == 0)
            {
                list = GetDoanhNghiepTaoMoiByDateBeginAndProductIDToList(dateBegin, productID);
            }
            else
            {
                SqlParameter[] parameters =
                   {
                new SqlParameter("@DateBegin",dateBegin),
                new SqlParameter("@CityID",cityID),
                new SqlParameter("@ProductID",productID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepTaoMoiByDateBeginAndCityIDAndProductID", parameters);
                list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepTaoMoiByDateBeginAndWardIDAndProductIDToList(DateTime dateBegin, int wardID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (wardID > 0)
            {
                SqlParameter[] parameters =
                   {
                new SqlParameter("@DateBegin",dateBegin),
                new SqlParameter("@WardID",wardID),
                new SqlParameter("@ProductID",productID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepTaoMoiByDateEndAndWardIDAndProductID", parameters);
                list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepTaoMoiByDateBeginAndCityIDAndWardIDAndProductIDToList(DateTime dateBegin, int cityID, int wardID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (wardID > 0)
            {
                list = GetDoanhNghiepTaoMoiByDateBeginAndWardIDAndProductIDToList(dateBegin, wardID, productID);
            }
            else
            {
                list = GetDoanhNghiepTaoMoiByDateBeginAndCityIDAndProductIDToList(dateBegin, cityID, productID);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepGiaHanByProductIDToList(int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@ProductID",productID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepGiaHanByProductID", parameters);
            list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepGiaHanByCityIDAndProductIDToList(int cityID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (cityID == 0)
            {
                list = GetDoanhNghiepGiaHanByProductIDToList(productID);
            }
            else
            {
                SqlParameter[] parameters =
                   {
                new SqlParameter("@CityID",cityID),
                new SqlParameter("@ProductID",productID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepGiaHanByCityIDAndProductID", parameters);
                list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepGiaHanByWardIDAndProductIDToList(int wardID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (wardID > 0)
            {
                SqlParameter[] parameters =
                  {

                new SqlParameter("@WardID",wardID),
                new SqlParameter("@ProductID",productID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepGiaHanByWardIDAndProductID", parameters);
                list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepGiaHanByCityIDAndWardIDAndProductIDToList(int cityID, int wardID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (wardID > 0)
            {
                list = GetDoanhNghiepGiaHanByCityIDAndProductIDToList(wardID, productID);
            }
            else
            {
                list = GetDoanhNghiepGiaHanByWardIDAndProductIDToList(cityID, productID);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepDangHoatDongByDateEndAndProductIDToList(DateTime dateEnd, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            SqlParameter[] parameters =
               {
                new SqlParameter("@DateEnd",dateEnd),
                new SqlParameter("@ProductID",productID),
                };
            DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepDangHoatDongByDateEndAndProductID", parameters);
            list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepDangHoatDongByDateEndAndCityIDAndProductIDToList(DateTime dateEnd, int cityID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (cityID == 0)
            {
                list = GetDoanhNghiepDangHoatDongByDateEndAndProductIDToList(dateEnd, productID);
            }
            else
            {
                SqlParameter[] parameters =
                   {
                new SqlParameter("@DateEnd",dateEnd),
                new SqlParameter("@CityID",cityID),
                new SqlParameter("@ProductID",productID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepDangHoatDongByDateEndAndCityIDAndProductID", parameters);
                list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepDangHoatDongByDateEndAndWardIDAndProductIDToList(DateTime dateEnd, int wardID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (wardID > 0)
            {
                SqlParameter[] parameters =
                   {
                new SqlParameter("@DateEnd",dateEnd),
                new SqlParameter("@WardID",wardID),
                new SqlParameter("@ProductID",productID),
                };
                DataTable dt = SQLHelper.Fill(AppGlobal.SQLServerConectionString, "sp_MembershipSelectDoanhNghiepDangHoatDongByDateEndAndWardIDAndProductID", parameters);
                list = SQLHelper.ToList<MembershipDataTransfer>(dt);
            }
            return list;
        }
        public List<MembershipDataTransfer> GetDoanhNghiepDangHoatDongByDateEndAndCityIDAndWardIDAndProductIDToList(DateTime dateEnd, int cityID, int wardID, int productID)
        {
            List<MembershipDataTransfer> list = new List<MembershipDataTransfer>();
            if (wardID > 0)
            {
                list = GetDoanhNghiepDangHoatDongByDateEndAndWardIDAndProductIDToList(dateEnd, wardID, productID);
            }
            else
            {
                list = GetDoanhNghiepDangHoatDongByDateEndAndCityIDAndProductIDToList(dateEnd, cityID, productID);
            }
            return list;
        }

    }
}
