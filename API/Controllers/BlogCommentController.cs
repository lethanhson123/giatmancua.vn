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

    public class BlogCommentController : BaseController
    {        
        private readonly IBlogCommentRepository _blogCommentRepository;
        public BlogCommentController(IBlogCommentRepository blogCommentRepository) : base()
        {            
            _blogCommentRepository = blogCommentRepository;
        }
        [HttpGet]
        public List<BlogComment> GetAllToList()
        {
            var result = _blogCommentRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogComment>> AsyncGetAllToList()
        {
            var result = await _blogCommentRepository.AsyncGetAllToList();
            return result;
        }
        [HttpGet]
        public List<BlogComment> GetByParentIDToList(int parentID)
        {
            var result = _blogCommentRepository.GetByParentIDToList(parentID).OrderBy(item => item.DatePost).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogComment>> AsyncGetByParentIDToList(int parentID)
        {
            var result = await _blogCommentRepository.AsyncGetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public List<BlogComment> GetByActiveToList(bool active)
        {
            var result = _blogCommentRepository.GetByActiveToList(active).OrderBy(item => item.DatePost).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogComment>> AsyncGetByActiveToList(bool active)
        {
            var result = await _blogCommentRepository.AsyncGetByActiveToList(active);
            return result;
        }
        [HttpGet]
        public BlogComment GetByID(int ID)
        {
            BlogComment result = new BlogComment();
            if (ID > 0)
            {
                result = _blogCommentRepository.GetByID(ID);
            }
            return result;
        }
        [HttpGet]
        public int RemoveByID(int ID)
        {
            var result = _blogCommentRepository.Remove(ID);
            return result;
        }
        [HttpPost]
        public int Save(BlogComment blogComment)
        {
            int result = AppGlobal.InitializationNumber;
            if (blogComment.ID > 0)
            {
                result = _blogCommentRepository.Update(blogComment);
            }
            else
            {
                result = _blogCommentRepository.Add(blogComment);
            }
            return result;
        }       
    }
}
