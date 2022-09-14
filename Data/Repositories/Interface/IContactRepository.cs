using VNPT2021.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace VNPT2021.Data.Repositories
{
    public interface IContactRepository : IRepository<Contact>
    {
        public List<Contact> GetByActiveAndSearchStringToList(bool active, string searchString);
    }
}
