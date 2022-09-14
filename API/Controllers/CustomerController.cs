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

    public class CustomerController : BaseController
    {
        private readonly ICustomerRepository _customerResposistory;
        public CustomerController(ICustomerRepository customerResposistory) : base()
        {
            _customerResposistory = customerResposistory;
        }
        [HttpGet]
        public List<Customer> GetAllToList()
        {
            var result = _customerResposistory.GetAllToList();
            return result;
        }
        [HttpGet]
        public async Task<List<Customer>> AsyncGetAllToList()
        {
            var result = await _customerResposistory.AsyncGetAllToList();
            return result;
        }
        [HttpGet]
        public List<Customer> GetByParentIDToList(int parentID)
        {
            var result = _customerResposistory.GetByParentIDToList(parentID).OrderBy(item => item.DatePost).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<Customer>> AsyncGetByParentIDToList(int parentID)
        {
            var result = await _customerResposistory.AsyncGetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public List<Customer> GetByActiveToList(bool active)
        {
            var result = _customerResposistory.GetByActiveToList(active).OrderBy(item => item.DatePost).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<Customer>> AsyncGetByActiveToList(bool active)
        {
            var result = await _customerResposistory.AsyncGetByActiveToList(active);
            return result;
        }
        [HttpGet]
        public List<Customer> GetByActiveAndSearchStringToList(bool active, string searchString)
        {
            var result = _customerResposistory.GetByActiveAndSearchStringToList(active, searchString).OrderBy(item => item.DatePost).ToList();
            return result;
        }
        [HttpGet]
        public Customer GetByID(int ID)
        {
            Customer result = new Customer();
            if (ID > 0)
            {
                result = _customerResposistory.GetByID(ID);
            }
            return result;
        }
        [HttpPost]
        public int Save(Customer customer)
        {
            int result = AppGlobal.InitializationNumber;
            if (customer.ID > 0)
            {
                result = _customerResposistory.Update(customer);
            }
            else
            {
                result = _customerResposistory.Add(customer);
            }
            return result;
        }        
    }
}
