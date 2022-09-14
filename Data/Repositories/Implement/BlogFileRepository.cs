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
    public class BlogFileRepository : Repository<BlogFile>, IBlogFileRepository
    {
        private readonly VNPTContext _context;

        public BlogFileRepository(VNPTContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(BlogFile model)
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
            if (!string.IsNullOrEmpty(model.Image))
            {
                model.URLImage = AppGlobal.DomainURL + AppGlobal.Images + "/" + AppGlobal.Blog + "/" + model.Image;
            }
        }
    }
}
