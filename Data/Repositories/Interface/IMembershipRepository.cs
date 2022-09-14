using VNPT2021.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;
using VNPT2021.Data.DataTransfer;

namespace VNPT2021.Data.Repositories
{
    public interface IMembershipRepository : IRepository<Membership>
    {      
        public Membership GetByAccountAndPassword(string account, string password);
        public Membership GetByParentIDAndTaxCode(int parentID, string taxCode);
        public Membership GetByTaxCode(string taxCode);
        public Membership GetByVNPTID();
        public List<Membership> GetByParentIDAndIsWebsiteToList(int parentID, bool isWebsite);
        public List<Membership> GetByNhanVienAndIsWebsiteToList(bool isWebsite);
        public List<Membership> GetByDoanhNghiepWithTaxCodeIsNullToList();
        public List<Membership> GetByDoanhNghiepWithMembershipCodeIsNullToList();       
        public List<Membership> GetByParentIDAndProductIDAndCityIDAndWardIDToList(int parentID, int productID, int cityID, int wardID);
        public List<Membership> GetKhongSuDungDichVuByParentIDAndProductIDAndCityIDAndWardIDToList(int parentID, int productID, int cityID, int wardID);        
        public List<MembershipDataTransfer> GetDoanhNghiepCAHetHanByDateEndAndCityIDToList(DateTime dateEnd, int cityID);
        public List<MembershipDataTransfer> GetByParentIDIDAndCityIDAndWardIDAndIsLienHeAndIsGiaHanToList(int parentID, int cityID, int wardID, bool isLienHe, bool isGiaHan);
        public List<MembershipDataTransfer> GetDoanhNghiepCAHetHanByDateEndAndCityIDAndWardIDToList(DateTime dateEnd, int cityID, int wardID);
        public List<MembershipDataTransfer> GetDoanhNghiepHetHanByDateEndAndCityIDAndWardIDAndProductIDToList(DateTime dateEnd, int cityID, int wardID, int productID);
        public List<MembershipDataTransfer> GetDoanhNghiepTaoMoiByDateBeginAndCityIDAndWardIDAndProductIDToList(DateTime dateBegin, int cityID, int wardID, int productID);
        public List<MembershipDataTransfer> GetDoanhNghiepGiaHanByCityIDAndWardIDAndProductIDToList(int cityID, int wardID, int productID);
        public List<MembershipDataTransfer> GetDoanhNghiepDangHoatDongByDateEndAndCityIDAndWardIDAndProductIDToList(DateTime dateEnd, int cityID, int wardID, int productID);
        public List<Membership> GetByParentIDAndProductIDListAndCityIDAndWardIDToList(int parentID, string productIDList, int cityID, int wardID);
        public List<Membership> GetKhongSuDungDichVuByParentIDAndProductIDListAndCityIDAndWardIDToList(int parentID, string productIDList, int cityID, int wardID);
        public List<Membership> GetByParentIDAndProductCountAndCityIDAndWardIDToList(int parentID, int productCount, int cityID, int wardID);
        public List<Membership> GetByProductIDAndActiveToList(int productID, bool active);
        public List<Membership> GetByParentIDAndActiveToList(int parentID, bool active);
    }
}
