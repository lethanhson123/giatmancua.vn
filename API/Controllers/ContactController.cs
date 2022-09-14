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

    public class ContactController : BaseController
    {
        private readonly IContactRepository _contactResposistory;
        public ContactController(IContactRepository contactResposistory) : base()
        {
            _contactResposistory = contactResposistory;
        }
        [HttpGet]
        public List<Contact> GetAllToList()
        {
            var result = _contactResposistory.GetAllToList();
            return result;
        }
        [HttpGet]
        public List<Contact> GetByActiveToList(bool active)
        {
            var result = _contactResposistory.GetByActiveToList(active).OrderBy(item => item.DatePost).ToList();
            return result;
        }
        [HttpGet]
        public List<Contact> GetByActiveAndSearchStringToList(bool active, string searchString)
        {
            var result = _contactResposistory.GetByActiveAndSearchStringToList(active, searchString).OrderBy(item => item.DatePost).ToList();
            return result;
        }
    }
}
