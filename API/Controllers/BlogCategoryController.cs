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

    public class BlogCategoryController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IBlogCategoryRepository _blogCategoryRepository;
        public BlogCategoryController(IWebHostEnvironment webHostEnvironment, IBlogCategoryRepository blogCategoryRepository) : base()
        {
            _webHostEnvironment = webHostEnvironment;
            _blogCategoryRepository = blogCategoryRepository;
        }
        [HttpGet]
        public List<BlogCategory> GetAllToList()
        {
            var result = _blogCategoryRepository.GetAllToList().OrderBy(item => item.SortOrder).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogCategory>> AsyncGetAllToList()
        {
            var result = await _blogCategoryRepository.AsyncGetAllToList();
            return result;
        }
        [HttpGet]
        public List<BlogCategory> GetByParentIDToList(int parentID)
        {
            var result = _blogCategoryRepository.GetByParentIDToList(parentID).OrderBy(item => item.Title).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogCategory>> AsyncGetByParentIDToList(int parentID)
        {
            var result = await _blogCategoryRepository.AsyncGetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public List<BlogCategory> GetByActiveToList(bool active)
        {
            var result = _blogCategoryRepository.GetByActiveToList(active).OrderBy(item => item.Title).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogCategory>> AsyncGetByActiveToList(bool active)
        {
            var result = await _blogCategoryRepository.AsyncGetByActiveToList(active);
            return result;
        }
        [HttpGet]
        public List<BlogCategory> GetByParentIDAndActiveToList(int parentID, bool active)
        {
            var result = _blogCategoryRepository.GetByParentIDAndActiveToList(parentID, active).OrderBy(item => item.Title).ToList();
            return result;
        }
        [HttpGet]
        public BlogCategory GetByID(int ID)
        {
            BlogCategory result = new BlogCategory();
            result.Active = true;
            if (ID > 0)
            {
                result = _blogCategoryRepository.GetByID(ID);
            }
            return result;
        }
        [HttpGet]
        public BlogCategory GetByIDString(string ID)
        {
            BlogCategory result = new BlogCategory();
            if (!string.IsNullOrEmpty(ID))
            {
                ID = AppGlobal.InitializationURLCode(ID);
                result = _blogCategoryRepository.GetByID(int.Parse(ID));
            }
            return result;
        }
        [HttpGet]
        public BlogCategory GetByURLCode(string URLCode)
        {
            BlogCategory result = new BlogCategory();
            if (!string.IsNullOrEmpty(URLCode))
            {
                URLCode = AppGlobal.InitializationURLCode(URLCode);
                result = _blogCategoryRepository.GetByURLCode(URLCode);
            }
            return result;
        }
        [HttpPost]
        public int Save()
        {
            BlogCategory blogCategory = JsonConvert.DeserializeObject<BlogCategory>(Request.Form["data"]);
            int result = AppGlobal.InitializationNumber;
            if (blogCategory.ID > 0)
            {
                result = _blogCategoryRepository.Update(blogCategory);
            }
            else
            {
                result = _blogCategoryRepository.Add(blogCategory);
            }
            return blogCategory.ID;
        }
        [HttpPost]
        public int SaveAndUploadImage()
        {
            int result = AppGlobal.InitializationNumber;
            BlogCategory blogCategory = JsonConvert.DeserializeObject<BlogCategory>(Request.Form["data"]);
            blogCategory.Code = AppGlobal.SetName(blogCategory.Code);
            try
            {
                if (Request.Form.Files.Count > 0)
                {
                    for (int i = 0; i < Request.Form.Files.Count; i++)
                    {
                        var file = Request.Form.Files[i];
                        if (file == null || file.Length == 0)
                        {
                        }
                        if (file != null)
                        {
                            string fileExtension = Path.GetExtension(file.FileName);
                            if (fileExtension.Contains("txt") == false)
                            {
                                string fileName = Path.GetFileNameWithoutExtension(file.FileName);
                                fileName = AppGlobal.Blog + "_" + blogCategory.URLCode + "_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                                string pathSub = AppGlobal.Images;
                                var physicalPath = Path.Combine(_webHostEnvironment.WebRootPath, pathSub, fileName);
                                using (var stream = new FileStream(physicalPath, FileMode.Create))
                                {
                                    file.CopyTo(stream);
                                    blogCategory.Image = fileName;
                                }
                            }
                        }
                    }
                }
            }
            catch (Exception e)
            {
                string mes = e.Message;
            }
            if (blogCategory.ID > 0)
            {
                result = _blogCategoryRepository.Update(blogCategory);
            }
            else
            {
                result = _blogCategoryRepository.Add(blogCategory);
            }
            return result;
        }
    }
}
