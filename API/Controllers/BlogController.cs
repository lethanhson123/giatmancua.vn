using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VNPT2021.Data.Models;
using VNPT2021.Data.Repositories;
using VNPT2021.Helpers;
using System.Xml;
namespace VNPT2021.API.Controllers
{

    public class BlogController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IBlogRepository _blogResposistory;
        private readonly IBlogFileRepository _blogFileRepository;
        private readonly IBlogCategoryRepository _blogCategoryRepository;
        private readonly IMembershipRepository _membershipRepository;
        private readonly IContactRepository _contactRepository;
        
        public BlogController(IWebHostEnvironment webHostEnvironment,
            IBlogRepository blogResposistory,
            IBlogFileRepository blogFileRepository,
            IBlogCategoryRepository blogCategoryRepository,
            IMembershipRepository membershipRepository,
            IContactRepository contactRepository) : base()
        {
            _webHostEnvironment = webHostEnvironment;
            _blogResposistory = blogResposistory;
            _blogFileRepository = blogFileRepository;
            _blogCategoryRepository = blogCategoryRepository;
            _membershipRepository = membershipRepository;
            _contactRepository = contactRepository;
        }
        [HttpGet]
        public List<Blog> GetAllToList()
        {
            var result = _blogResposistory.GetAllToList();
            return result;
        }
        [HttpGet]
        public async Task<List<Blog>> AsyncGetAllToList()
        {
            var result = await _blogResposistory.AsyncGetAllToList();
            return result;
        }
        [HttpGet]
        public List<Blog> GetByParentIDToList(int parentID)
        {
            var result = _blogResposistory.GetByParentIDToList(parentID).OrderByDescending(item => item.DatePost).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<Blog>> AsyncGetByParentIDToList(int parentID)
        {
            var result = await _blogResposistory.AsyncGetByParentIDToList(parentID);
            return result;
        }
        [HttpGet]
        public List<Blog> GetByActiveToList(bool active)
        {
            var result = _blogResposistory.GetByActiveToList(active).OrderByDescending(item => item.DatePost).ToList();
            return result;
        }
        [HttpGet]
        public async Task<List<Blog>> AsyncGetByActiveToList(bool active)
        {
            var result = await _blogResposistory.AsyncGetByActiveToList(active);
            return result;
        }
        [HttpGet]
        public List<Blog> GetByParentIDAndActiveToList(int parentID, bool active)
        {
            var result = _blogResposistory.GetByParentIDAndActiveToList(parentID, active).OrderByDescending(item => item.DatePost).ToList();
            return result;
        }
        [HttpGet]
        public List<Blog> GetByParentIDOrSearchToList(int parentID, string search)
        {
            var result = _blogResposistory.GetByParentIDOrSearchToList(parentID, search).OrderByDescending(item => item.DatePost).ToList();
            return result;
        }
        [HttpGet]
        public List<Blog> GetByParentIDOrSearchOrIsBannerToList(int parentID, string search, bool isBanner)
        {
            var result = _blogResposistory.GetByParentIDOrSearchOrIsBannerToList(parentID, search, isBanner).OrderByDescending(item => item.DatePost).ToList();
            return result;
        }
        [HttpGet]
        public Blog GetByID(int ID)
        {
            Blog result = new Blog();
            result.DatePost = AppGlobal.InitializationDateTime;
            result.Active = true;
            result.ParentID = 1;
            if (ID > 0)
            {
                result = _blogResposistory.GetByID(ID);
            }
            return result;
        }
        [HttpGet]
        public Blog GetByIDString(string ID)
        {
            Blog result = new Blog();
            if (!string.IsNullOrEmpty(ID))
            {
                ID = AppGlobal.InitializationURLCode(ID);
                result = _blogResposistory.GetByID(int.Parse(ID));
            }
            return result;
        }
        [HttpGet]
        public Blog GetByURLCode(string URLCode)
        {
            Blog result = new Blog();
            if (!string.IsNullOrEmpty(URLCode))
            {
                URLCode = AppGlobal.InitializationURLCode(URLCode);
                result = _blogResposistory.GetByURLCode(URLCode);
            }
            return result;
        }
        [HttpPost]
        public int Save(Blog blog)
        {
            int result = AppGlobal.InitializationNumber;
            if (blog.ID > 0)
            {
                result = _blogResposistory.Update(blog);
            }
            else
            {
                result = _blogResposistory.Add(blog);

            }
            return result;
        }
        [HttpPost]
        public int SaveAndUploadImage()
        {
            int result = AppGlobal.InitializationNumber;
            Blog blog = JsonConvert.DeserializeObject<Blog>(Request.Form["data"]);
            bool isTapTinDinhKem = JsonConvert.DeserializeObject<bool>(Request.Form["IsTapTinDinhKem"]);
            if (string.IsNullOrEmpty(blog.URLCode))
            {
                blog.URLCode = AppGlobal.SetName(blog.Title);
            }
            try
            {
                if (Request.Form.Files.Count > 0)
                {
                    if (isTapTinDinhKem != true)
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
                                    fileName = blog.URLCode + "_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                                    string pathSub = AppGlobal.Images + "/" + AppGlobal.Blog;
                                    var physicalPath = Path.Combine(_webHostEnvironment.WebRootPath, pathSub, fileName);
                                    using (var stream = new FileStream(physicalPath, FileMode.Create))
                                    {
                                        file.CopyTo(stream);
                                        blog.Image = fileName;
                                    }
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
            if (blog.ID > 0)
            {
                result = _blogResposistory.Update(blog);
            }
            else
            {
                result = _blogResposistory.Add(blog);
            }
            if (Request.Form.Files.Count > 0)
            {
                if (isTapTinDinhKem == true)
                {
                    foreach (var fileTapTinDinhKem in Request.Form.Files)
                    {
                        if (fileTapTinDinhKem != null)
                        {
                            BlogFile blogFile = new BlogFile();
                            blogFile.ParentID = blog.ID;
                            blogFile.Title = blog.Title;
                            blogFile.URLCode = blog.URLCode;
                            string fileExtension = Path.GetExtension(fileTapTinDinhKem.FileName);
                            string fileName = Path.GetFileNameWithoutExtension(fileTapTinDinhKem.FileName);
                            fileName = blogFile.URLCode + "_" + AppGlobal.InitializationDateTimeCode + fileExtension;
                            string pathSub = AppGlobal.Images + "/" + AppGlobal.Blog;
                            var physicalPath = Path.Combine(_webHostEnvironment.WebRootPath, pathSub, fileName);
                            using (var stream = new FileStream(physicalPath, FileMode.Create))
                            {
                                fileTapTinDinhKem.CopyTo(stream);
                                blogFile.Image = fileName;
                                _blogFileRepository.Add(blogFile);

                            }
                        }
                    }
                }
            }

            if (result == 1)
            {
                try
                {
                    string subPath = AppGlobal.Download + @"\" + AppGlobal.HTML;
                    string body = AppGlobal.InitializationString;
                    var physicalPathRead = Path.Combine(_webHostEnvironment.WebRootPath, subPath, AppGlobal.BlogHTML);
                    using (FileStream fs = new FileStream(physicalPathRead, FileMode.Open))
                    {
                        using (StreamReader r = new StreamReader(fs, Encoding.UTF8))
                        {
                            body = r.ReadToEnd();
                        }
                    }
                    if (!string.IsNullOrEmpty(body))
                    {

                        body = body.Replace(@"[DomainName]", AppGlobal.DomainName);
                        body = body.Replace(@"[DomainURL]", AppGlobal.DomainURL);

                        VNPT2021.Data.Models.Membership vnpt = _membershipRepository.GetByVNPTID();
                        body = body.Replace(@"[VNPTFullName]", vnpt.FullName);
                        body = body.Replace(@"[VNPTPhone]", vnpt.Phone);
                        body = body.Replace(@"[VNPTPhoneDisplay]", vnpt.PhoneDisplay);
                        body = body.Replace(@"[VNPTEmail]", vnpt.Email);
                        body = body.Replace(@"[VNPTFacebook]", vnpt.Facebook);
                        body = body.Replace(@"[VNPTAddress]", vnpt.Address);

                        StringBuilder blogList = new StringBuilder();
                        List<Blog> listBlog = _blogResposistory.GetByActiveToList(true).OrderByDescending(item => item.DatePost).ToList();
                        int no = AppGlobal.InitializationNumber;
                        foreach (Blog item in listBlog)
                        {
                            no = no + 1;
                            string url = AppGlobal.DomainName + "/" + AppGlobal.Blog + "/" + item.URLCode + "-" + item.ID + ".html";
                            blogList.AppendLine("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a target='_blank' title='" + item.Title + "' href='" + url + "'>" + no + ". " + item.Title + " (" + item.DatePost.Value.ToString("dd/MM/yyyy HH:mm:ss") + ")</a>");
                            blogList.AppendLine("<br/>");
                            blogList.AppendLine("<br/>");
                        }
                        body = body.Replace(@"[BlogList]", blogList.ToString());
                        Mail mail = new Mail();
                        if (!string.IsNullOrEmpty(vnpt.Email))
                        {
                            mail.ToMail = mail.ToMail + vnpt.Email + ",";
                        }

                        List<Contact> listContact = _contactRepository.GetByActiveToList(true);
                        foreach (Contact item in listContact)
                        {
                            if (!string.IsNullOrEmpty(item.Email))
                            {
                                mail.ToMail = mail.ToMail + item.Email + ",";
                            }
                        }
                        mail.Subject = "Thông tin mới nhất từ chúng tôi - " + DateTime.Now.ToString("dd/MM/yyyy HH:mm:ss");
                        mail.Body = body;
                        Mail.SendMail(mail);
                    }
                }
                catch (Exception e)
                {
                    string mes = e.Message;
                }
            }
            return blog.ID;
        }
        [HttpGet]
        public JsonResult InitializationSiteMapToXML()
        {
            string result = AppGlobal.InitializationString;
            string domain = "https://giatmancua.vn/";
            try
            {
                string fileName = @"sitemap.xml";
                string subPath = AppGlobal.Download + "/" + AppGlobal.HTML;
                var physicalPathCreate = Path.Combine(@"C:\Website\giatmancua.vn\wwwroot", AppGlobal.InitializationString, fileName);
                using (XmlTextWriter writer = new XmlTextWriter(physicalPathCreate, System.Text.Encoding.UTF8))
                {
                    writer.WriteStartDocument();
                    writer.WriteStartElement("urlset");
                    writer.WriteAttributeString("xmlns", "http://www.sitemaps.org/schemas/sitemap/0.9");
                    writer.WriteAttributeString("xmlns:xsi", "http://www.w3.org/2001/XMLSchema-instance");
                    writer.WriteAttributeString("xmlns:image", "http://www.google.com/schemas/sitemap-image/1.1");
                    writer.WriteAttributeString("xmlns:video", "http://www.google.com/schemas/sitemap-video/1.1");
                    writer.WriteAttributeString("xsi:schemaLocation", "http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd");

                    writer.WriteStartElement("url");
                    writer.WriteElementString("loc", domain);
                    writer.WriteEndElement();

                    writer.WriteStartElement("url");
                    writer.WriteElementString("loc", domain + "gioi-thieu.html");
                    writer.WriteEndElement();

                    writer.WriteStartElement("url");
                    writer.WriteElementString("loc", domain + "lien-he.html");
                    writer.WriteEndElement();

                    List<BlogCategory> listBlogCategory = _blogCategoryRepository.GetByActiveToList(true);
                    foreach (BlogCategory item in listBlogCategory)
                    {
                        writer.WriteStartElement("url");
                        writer.WriteElementString("loc", domain + item.Code + "/" + item.URLCode + ".html");
                        writer.WriteEndElement();
                    }

                    List<Blog> listBlog = _blogResposistory.GetByActiveToList(true);
                    foreach (Blog item in listBlog)
                    {
                        writer.WriteStartElement("url");
                        writer.WriteElementString("loc", domain + item.Code + "/" + item.URLCode + ".html");
                        writer.WriteEndElement();
                    }

                    writer.WriteEndDocument();
                    writer.Flush();
                }


            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return Json(result);
        }
    }
}
