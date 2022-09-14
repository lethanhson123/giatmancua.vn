using VNPT2021.Data.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace VNPT2021.Data.Repositories
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        public List<Customer> GetByActiveAndSearchStringToList(bool active, string searchString);
    }
}
