using VNPT2021.Data.Models;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using VNPT2021.Helpers;
using Microsoft.EntityFrameworkCore;
using System.Xml;
using System.IO;
using System;

namespace VNPT2021.Data.Repositories
{
    public class BlogRepository : Repository<Blog>, IBlogRepository
    {
        private readonly VNPTContext _context;

        public BlogRepository(VNPTContext context) : base(context)
        {
            _context = context;
        }

        public override void Initialization(Blog model)
        {
            if (model.DateCreated == null)
            {
                model.DateCreated = AppGlobal.InitializationDateTime;
            }
            model.DateUpdated = AppGlobal.InitializationDateTime;
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
                model.Code = AppGlobal.Blog;
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
            if (!string.IsNullOrEmpty(model.HTMLContent))
            {
                model.HTMLContent = model.HTMLContent.Replace(@"<div", @"<p");
                model.HTMLContent = model.HTMLContent.Replace(@"</div>", @"</p>");
            }
            if (!string.IsNullOrEmpty(model.Image))
            {
                model.URLImage = AppGlobal.DomainURL + AppGlobal.Images + "/" + AppGlobal.Blog + "/" + model.Image;
            }
            else
            {
                model.URLImage = AppGlobal.SetImageFileName(model.HTMLContent);
            }
        }
        public Blog GetByURLCode(string URLCode)
        {
            Blog result = new Blog();
            result = _context.Set<Blog>().AsNoTracking().FirstOrDefault(model => model.URLCode == URLCode);
            return result;
        }
        public List<Blog> GetByParentIDAndActiveToList(int parentID, bool active)
        {
            var result = _context.Set<Blog>().Where(model => model.ParentID == parentID && model.Active == active).ToList();
            return result;
        }
        public List<Blog> GetByActiveAndIsBannerToList(bool active, bool isBanner)
        {
            var result = _context.Set<Blog>().Where(model => model.Active == active && model.IsBanner == isBanner).ToList();
            return result;
        }
        public List<Blog> GetBySearchToList(string search)
        {
            List<Blog> result = new List<Blog>();
            if (!string.IsNullOrEmpty(search))
            {
                result = _context.Set<Blog>().Where(model => model.Title.Contains(search) || model.URLCode.Contains(search)).ToList();
            }
            return result;
        }
        public List<Blog> GetByIsBannerToList(bool isBanner)
        {
            var result = _context.Set<Blog>().Where(model => (isBanner == true && model.IsBanner == isBanner) || (isBanner == false && (model.IsBanner == isBanner || model.IsBanner == null))).ToList();
            return result;
        }
        public List<Blog> GetBySearchAndActiveToList(string search, bool active)
        {
            List<Blog> result = new List<Blog>();
            if (!string.IsNullOrEmpty(search))
            {
                result = _context.Set<Blog>().Where(model => (model.Title.Contains(search) || model.URLCode.Contains(search) || model.HTMLContent.Contains(search)) && model.Active == active).ToList();
            }
            return result;
        }
        public List<Blog> GetByParentIDOrSearchToList(int parentID, string search)
        {
            List<Blog> result = new List<Blog>();
            if (!string.IsNullOrEmpty(search))
            {
                result = GetBySearchToList(search);
            }
            else
            {
                result = GetByParentIDToList(parentID);
            }
            return result;
        }
        public List<Blog> GetByParentIDOrSearchOrIsBannerToList(int parentID, string search, bool isBanner)
        {
            List<Blog> result = new List<Blog>();
            if (!string.IsNullOrEmpty(search))
            {
                result = GetBySearchToList(search);
            }
            else
            {
                if (isBanner == true)
                {
                    result = GetByIsBannerToList(isBanner);
                }
                else
                {
                    if (parentID == 0)
                    {
                        result = GetByIsBannerToList(isBanner);
                    }
                    else
                    {
                        result = GetByParentIDToList(parentID);
                    }
                }
            }
            return result;
        }        
    }
}
