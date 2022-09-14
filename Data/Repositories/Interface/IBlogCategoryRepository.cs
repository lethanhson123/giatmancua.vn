using VNPT2021.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace VNPT2021.Data.Repositories
{
    public interface IBlogCategoryRepository : IRepository<BlogCategory>
    {
        public BlogCategory GetByURLCode(string URLCode);
        public List<BlogCategory> GetByParentIDAndActiveToList(int parentID, bool active);
        public List<BlogCategory> GetByActiveIsTrueToList();
    }
}
