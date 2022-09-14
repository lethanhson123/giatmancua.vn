using VNPT2021.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace VNPT2021.Data.Repositories
{
    public interface IBlogRepository : IRepository<Blog>
    {
        public Blog GetByURLCode(string URLCode);
        public List<Blog> GetByParentIDAndActiveToList(int parentID, bool active);
        public List<Blog> GetByActiveAndIsBannerToList(bool active, bool isBanner);
        public List<Blog> GetByParentIDOrSearchToList(int parentID, string search);
        public List<Blog> GetByParentIDOrSearchOrIsBannerToList(int parentID, string search, bool isBanner);
        public List<Blog> GetBySearchAndActiveToList(string search, bool active);
    }
}
