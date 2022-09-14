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
using Microsoft.EntityFrameworkCore;

namespace VNPT2021.Data.Repositories
{
    public class BlogCategoryRepository : Repository<BlogCategory>, IBlogCategoryRepository
    {
        private readonly VNPTContext _context;

        public BlogCategoryRepository(VNPTContext context) : base(context)
        {
            _context = context;
        }
        public override void Initialization(BlogCategory model)
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
            if (string.IsNullOrEmpty(model.URLCode))
            {
                model.URLCode = AppGlobal.SetName(model.Title);
            }
            if (string.IsNullOrEmpty(model.Code))
            {
                model.Code = AppGlobal.Blogs;
            }
            if (string.IsNullOrEmpty(model.Description))
            {
                model.Description = model.Title;
            }
            if (string.IsNullOrEmpty(model.METAKeyword))
            {
                model.METAKeyword = model.Title;
            }
            if (string.IsNullOrEmpty(model.METADescription))
            {
                model.METADescription = model.Description;
            }           
        }
        public void InitializationSQL()
        {
            SQLHelper.ExecuteNonQuery(AppGlobal.SQLServerConectionString, "sp_BlogCategoryInitialization");
        }
        public BlogCategory GetByURLCode(string URLCode)
        {
            BlogCategory result = new BlogCategory();
            result = _context.Set<BlogCategory>().AsNoTracking().FirstOrDefault(model => model.URLCode == URLCode);
            return result;
        }
        public List<BlogCategory> GetByParentIDAndActiveToList(int parentID, bool active)
        {
            var result = _context.Set<BlogCategory>().Where(model => model.ParentID == parentID && model.Active == active).ToList();
            return result;
        }
        public List<BlogCategory> GetByActiveIsTrueToList()
        {
            InitializationSQL();
            var result = _context.Set<BlogCategory>().Where(model => model.Active == true).OrderBy(model=>model.SortOrder).ToList();
            return result;
        }        
        public override List<BlogCategory> GetAllToList()
        {
            InitializationSQL();
            var result = _context.Set<BlogCategory>().ToList();
            return result ?? new List<BlogCategory>();
        }
    }
}
