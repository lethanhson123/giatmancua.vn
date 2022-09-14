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

    public class BlogFileController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IBlogFileRepository _blogFileRepository;
        private readonly IBlogRepository _blogResposistory;
        public BlogFileController(IWebHostEnvironment webHostEnvironment, IBlogFileRepository blogFileRepository, IBlogRepository blogResposistory) : base()
        {
            _webHostEnvironment = webHostEnvironment;
            _blogFileRepository = blogFileRepository;
            _blogResposistory = blogResposistory;
        }
        [HttpGet]
        public List<BlogFile> GetAllToList()
        {
            var result = _blogFileRepository.GetAllToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogFile>> AsyncGetAllToList()
        {
            var result = await _blogFileRepository.AsyncGetAllToList();
            return result;
        }
        [HttpGet]
        public List<BlogFile> GetByParentIDToList(int parentID)
        {
            var result = _blogFileRepository.GetByParentIDToList(parentID).OrderBy(item => item.Image).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogFile>> AsyncGetByParentIDToList(int parentID)
        {
            var result = await _blogFileRepository.AsyncGetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public List<BlogFile> GetByActiveToList(bool active)
        {
            var result = _blogFileRepository.GetByActiveToList(active).OrderBy(item => item.Image).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<BlogFile>> AsyncGetByActiveToList(bool active)
        {
            var result = await _blogFileRepository.AsyncGetByActiveToList(active);
            return result;
        }
        [HttpGet]
        public BlogFile GetByID(int ID)
        {
            BlogFile result = new BlogFile();
            if (ID > 0)
            {
                result = _blogFileRepository.GetByID(ID);
            }
            return result;
        }
        [HttpGet]
        public int RemoveByID(int ID)
        {
            var result = _blogFileRepository.Remove(ID);
            return result;
        }
        [HttpPost]
        public int Save(BlogFile blogFile)
        {
            int result = AppGlobal.InitializationNumber;
            if (blogFile.ID > 0)
            {
                result = _blogFileRepository.Update(blogFile);
            }
            else
            {
                result = _blogFileRepository.Add(blogFile);
            }
            return result;
        }
        [HttpPost]
        public int SaveAndUploadImage()
        {
            int result = AppGlobal.InitializationNumber;
            BlogFile blogFile = JsonConvert.DeserializeObject<BlogFile>(Request.Form["data"]);
            if (string.IsNullOrEmpty(blogFile.URLCode))
            {
                blogFile.URLCode = _blogResposistory.GetByID(blogFile.ParentID.Value).URLCode;
            }
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
                                fileName = AppGlobal.Blog + "_" + blogFile.URLCode + "_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                                string pathSub = AppGlobal.Images;
                                var physicalPath = Path.Combine(_webHostEnvironment.WebRootPath, pathSub, fileName);
                                using (var stream = new FileStream(physicalPath, FileMode.Create))
                                {
                                    file.CopyTo(stream);
                                    blogFile.Image = fileName;
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
            if (blogFile.ID > 0)
            {
                result = _blogFileRepository.Update(blogFile);
            }
            else
            {
                result = _blogFileRepository.Add(blogFile);
            }
            return result;
        }
    }
}
