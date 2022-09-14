using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Website.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using VNPT2021.Data.Models;
using VNPT2021.Data.Repositories;
using VNPT2021.Helpers;
using System.Text;
using Microsoft.AspNetCore.Http;
using VNPT2021.Data.ViewModels;
using Microsoft.AspNetCore.Hosting;
using System.IO;

namespace Website.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly ICustomerRepository _customerResposistory;
        private readonly IMembershipRepository _membershipRepository;
        private readonly IContactRepository _contactRepository;
        public HomeController(ILogger<HomeController> logger,
            IWebHostEnvironment webHostEnvironment,
            ICustomerRepository customerResposistory,
            IMembershipRepository membershipRepository,
            IContactRepository contactRepository
            )
        {
            _logger = logger;
            _webHostEnvironment = webHostEnvironment;
            _customerResposistory = customerResposistory;
            _membershipRepository = membershipRepository;
            _contactRepository = contactRepository;
        }
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult About()
        {
            return View();
        }
        public IActionResult Contact()
        {
            Contact model = new Contact();
            return View(model);
        }
        public IActionResult Thank()
        {
            return View();
        }
        public IActionResult Registration()
        {
            Customer model = new Customer();
            return View(model);
        }
        public IActionResult Blogs(string URLCode, int ID)
        {
            BaseViewModel viewModel = new BaseViewModel();
            viewModel.UrlCode = URLCode;
            viewModel.ID = ID;
            return View(viewModel);
        }
        public IActionResult Blog(string URLCode, int ID)
        {
            BaseViewModel viewModel = new BaseViewModel();
            viewModel.UrlCode = URLCode;
            viewModel.ID = ID;
            return View(viewModel);
        }
        public IActionResult Tag(string searchString)
        {
            BaseViewModel viewModel = new BaseViewModel();
            viewModel.QueryString = searchString;
            return View(viewModel);
        }
        [HttpPost]
        public string SaveNewsletter(string email)
        {
            Contact contact = new Contact();
            contact.Email = email;
            string result = AppGlobal.InitializationString;
            _contactRepository.Add(contact);
            try
            {
                string subPath = AppGlobal.HTML;
                string body = AppGlobal.InitializationString;
                var physicalPathRead = Path.Combine(_webHostEnvironment.WebRootPath, subPath, AppGlobal.NewsletterHTML);
                using (FileStream fs = new FileStream(physicalPathRead, FileMode.Open))
                {
                    using (StreamReader r = new StreamReader(fs, Encoding.UTF8))
                    {
                        body = r.ReadToEnd();
                    }
                }
                result = body;
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


                    body = body.Replace(@"[Code]", contact.Code);
                    body = body.Replace(@"[ContactEmail]", contact.Email);

                    Mail mail = new Mail();
                    if (!string.IsNullOrEmpty(vnpt.Email))
                    {
                        mail.ToMail = mail.ToMail + vnpt.Email + ",";
                    }
                    if (!string.IsNullOrEmpty(contact.Email))
                    {
                        mail.ToMail = mail.ToMail + contact.Email + ",";
                    }
                    mail.Subject = "Đăng ký nhận bản tin: " + contact.Code + " - " + contact.Email;
                    mail.Body = body;
                    Mail.SendMail(mail);
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }
        [HttpPost]
        public string SaveContact(Contact contact)
        {
            string result = AppGlobal.InitializationString;
            _contactRepository.Add(contact);
            try
            {
                string subPath = AppGlobal.HTML;
                string body = AppGlobal.InitializationString;
                var physicalPathRead = Path.Combine(_webHostEnvironment.WebRootPath, subPath, AppGlobal.ContactHTML);
                using (FileStream fs = new FileStream(physicalPathRead, FileMode.Open))
                {
                    using (StreamReader r = new StreamReader(fs, Encoding.UTF8))
                    {
                        body = r.ReadToEnd();
                    }
                }
                result = body;
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


                    body = body.Replace(@"[Code]", contact.Code);
                    body = body.Replace(@"[ContactFullName]", contact.FullName);
                    body = body.Replace(@"[ContactEmail]", contact.Email);
                    body = body.Replace(@"[ContactDescription]", contact.Description);

                    Mail mail = new Mail();
                    if (!string.IsNullOrEmpty(vnpt.Email))
                    {
                        mail.ToMail = mail.ToMail + vnpt.Email + ",";
                    }
                    if (!string.IsNullOrEmpty(contact.Email))
                    {
                        mail.ToMail = mail.ToMail + contact.Email + ",";
                    }
                    mail.Subject = "Liên hệ: " + contact.Code + " - " + contact.Email;
                    mail.Body = body;
                    Mail.SendMail(mail);
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }
        [HttpPost]
        public string SaveCustomer(Customer customer)
        {
            string result = AppGlobal.InitializationString;
            _customerResposistory.Add(customer);
            try
            {
                string subPath = AppGlobal.HTML;
                string body = AppGlobal.InitializationString;
                var physicalPathRead = Path.Combine(_webHostEnvironment.WebRootPath, subPath, AppGlobal.DonHangHTML);
                using (FileStream fs = new FileStream(physicalPathRead, FileMode.Open))
                {
                    using (StreamReader r = new StreamReader(fs, Encoding.UTF8))
                    {
                        body = r.ReadToEnd();
                    }
                }
                result = body;
                if (!string.IsNullOrEmpty(body))
                {
                    var cultureInfo = System.Globalization.CultureInfo.GetCultureInfo("vi-VN");

                    body = body.Replace(@"[DomainName]", AppGlobal.DomainName);
                    body = body.Replace(@"[DomainURL]", AppGlobal.DomainURL);
                    VNPT2021.Data.Models.Membership vnpt = _membershipRepository.GetByVNPTID();
                    body = body.Replace(@"[VNPTFullName]", vnpt.FullName);
                    body = body.Replace(@"[VNPTPhone]", vnpt.Phone);
                    body = body.Replace(@"[VNPTPhoneDisplay]", vnpt.PhoneDisplay);
                    body = body.Replace(@"[VNPTEmail]", vnpt.Email);
                    body = body.Replace(@"[VNPTFacebook]", vnpt.Facebook);
                    body = body.Replace(@"[VNPTAddress]", vnpt.Address);

                    body = body.Replace(@"[Code]", customer.Code);
                    body = body.Replace(@"[CustomerFullName]", customer.FullName);
                    body = body.Replace(@"[CustomerTaxCode]", customer.TaxCode);
                    body = body.Replace(@"[CustomerPhone]", customer.Phone);
                    body = body.Replace(@"[CustomerEmail]", customer.Email);
                    body = body.Replace(@"[CustomerAddress]", customer.Address);
                    body = body.Replace(@"[ContactFullName]", customer.ContactFullName);
                    body = body.Replace(@"[ContactPhone]", customer.ContactPhone);
                    body = body.Replace(@"[ContactEmail]", customer.ContactEmail);
                    body = body.Replace(@"[Note]", customer.Note);
                    body = body.Replace(@"[ConfigProductSubTitle]", customer.ConfigProductSubTitle);
                    body = body.Replace(@"[ConfigProductSubPrice]", String.Format(cultureInfo, "{0:c}", customer.ConfigProductSubPrice));
                    body = body.Replace(@"[ConfigProductSubDescription]", customer.ConfigProductSubDescription);

                    Mail mail = new Mail();
                    if (!string.IsNullOrEmpty(vnpt.Email))
                    {
                        mail.ToMail = mail.ToMail + vnpt.Email + ",";
                    }
                    if (!string.IsNullOrEmpty(customer.Email))
                    {
                        mail.ToMail = mail.ToMail + customer.Email + ",";
                    }
                    if (!string.IsNullOrEmpty(customer.ContactEmail))
                    {
                        mail.ToMail = mail.ToMail + customer.ContactEmail + ",";
                    }
                    mail.Subject = mail.Subject + ": " + customer.Code + " - " + customer.Phone;
                    mail.Body = body;
                    Mail.SendMail(mail);
                }
            }
            catch (Exception e)
            {
                result = e.Message;
            }
            return result;
        }
    }
}
