using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VNPT2021.Data.Models;
using VNPT2021.Data.Repositories;
using VNPT2021.Helpers;

namespace VNPT2021.API.Controllers
{

    public class MembershipAddressController : BaseController
    {
        private readonly IMembershipAddressRepository _membershipAddressResposistory;
        public MembershipAddressController(IMembershipAddressRepository membershipAddressResposistory) : base()
        {
            _membershipAddressResposistory = membershipAddressResposistory;
        }
        [HttpGet]
        public List<MembershipAddress> GetAllToList()
        {
            var result = _membershipAddressResposistory.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<MembershipAddress> GetByParentIDToList(int parentID)
        {
            var result = _membershipAddressResposistory.GetByParentIDToList(parentID).OrderBy(item => item.DateUpdated).ToList();
            return result;
        }
        [HttpGet]
        public int RemoveByID(int ID)
        {
            var result = _membershipAddressResposistory.Remove(ID);
            return result;
        }
        [HttpPost]
        public int Save()
        {
            MembershipAddress membershipAddress = JsonConvert.DeserializeObject<MembershipAddress>(Request.Form["data"]);
            int result = AppGlobal.InitializationNumber;
            if (membershipAddress.ID > 0)
            {
                result = _membershipAddressResposistory.Update(membershipAddress);
            }
            else
            {
                result = _membershipAddressResposistory.Add(membershipAddress);
            }
            return membershipAddress.ID;
        }
    }
}
