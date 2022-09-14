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
    public class ContactRepository : Repository<Contact>, IContactRepository
    {
        private readonly VNPTContext _context;

        public ContactRepository(VNPTContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(Contact model)
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
        }
        public List<Contact> GetByActiveAndSearchStringToList(bool active, string searchString)
        {
            List<Contact> result = new List<Contact>();
            if (string.IsNullOrEmpty(searchString))
            {
                result = GetByActiveToList(active);
            }
            else
            {
                result=_context.Set<Contact>().Where(model => model.Active == active && (model.Code.Contains(searchString) || model.Email.Contains(searchString) || model.FullName.Contains(searchString))).ToList();
            }
            return result;
        }
    }
}
