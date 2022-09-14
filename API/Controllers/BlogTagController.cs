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

    public class BlogTagController : BaseController
    {        
        private readonly IBlogTagRepository _blogTagRepository;
        public BlogTagController(IBlogTagRepository blogTagRepository) : base()
        {            
            _blogTagRepository = blogTagRepository;
        }
        [HttpGet]
        public List<BlogTag> GetAllToList()
        {
            var result = _blogTagRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogTag>> AsyncGetAllToList()
        {
            var result = await _blogTagRepository.AsyncGetAllToList();
            return result;
        }
        [HttpGet]
        public List<BlogTag> GetByParentIDToList(int parentID)
        {
            var result = _blogTagRepository.GetByParentIDToList(parentID).OrderBy(item => item.Tag).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogTag>> AsyncGetByParentIDToList(int parentID)
        {
            var result = await _blogTagRepository.AsyncGetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public List<BlogTag> GetByActiveToList(bool active)
        {
            var result = _blogTagRepository.GetByActiveToList(active).OrderBy(item => item.Tag).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogTag>> AsyncGetByActiveToList(bool active)
        {
            var result = await _blogTagRepository.AsyncGetByActiveToList(active);
            return result;
        }
        [HttpGet]
        public BlogTag GetByID(int ID)
        {
            BlogTag result = new BlogTag();
            if (ID > 0)
            {
                result = _blogTagRepository.GetByID(ID);
            }
            return result;
        }
        [HttpGet]
        public int RemoveByID(int ID)
        {
            var result = _blogTagRepository.Remove(ID);
            return result;
        }
        [HttpPost]
        public int Save(BlogTag blogTag)
        {
            int result = AppGlobal.InitializationNumber;
            if (blogTag.ID > 0)
            {
                result = _blogTagRepository.Update(blogTag);
            }
            else
            {
                result = _blogTagRepository.Add(blogTag);
            }
            return result;
        }       
    }
}
