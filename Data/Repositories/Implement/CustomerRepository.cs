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

namespace VNPT2021.Data.Repositories
{
    public class CustomerRepository : Repository<Customer>, ICustomerRepository
    {
        private readonly VNPTContext _context;

        public CustomerRepository(VNPTContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(Customer model)
        {
            if (model.DateCreated == null)
            {
                model.DateCreated = AppGlobal.InitializationDateTime;
            }
            model.DateUpdated = AppGlobal.InitializationDateTime;
            if (model.Active == null)
            {
                model.Active = true;
            }
            if (model.DatePost == null)
            {
                model.DatePost = AppGlobal.InitializationDateTime;
            }
            if (model.Code == null)
            {
                model.Code = AppGlobal.InitializationDateTimeCode0001;
            }
            if (model.MembershipID == null)
            {
                Membership membership = _context.Set<Membership>().FirstOrDefault(item => item.TaxCode == model.TaxCode);
                if (membership != null)
                {
                    model.MembershipID = membership.ID;
                }
            }            
        }
        public List<Customer> GetByActiveAndSearchStringToList(bool active, string searchString)
        {
            List<Customer> result = new List<Customer>();
            if (string.IsNullOrEmpty(searchString))
            {
                result = GetByActiveToList(active);
            }
            else
            {
                result = _context.Set<Customer>().Where(model => model.Active == active && (model.Code.Contains(searchString) || model.Email.Contains(searchString) || model.FullName.Contains(searchString) || model.TaxCode.Contains(searchString))).ToList();
            }
            return result;
        }
    }   
}
