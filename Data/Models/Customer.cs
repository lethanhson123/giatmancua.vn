using System;
using System.Collections.Generic;

namespace VNPT2021.Data.Models
{
    
    public partial class Customer : BaseModel
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public DateTime? DatePost { get; set; }
        public string TaxCode { get; set; }
        public string ContactFullName { get; set; }
        public string ContactPhone { get; set; }
        public string ContactEmail { get; set; }
        public int? MembershipID { get; set; }
        public int? ConfigProductID { get; set; }
        public int? ConfigProductSubID { get; set; }
        public string ConfigProductTitle { get; set; }
        public string ConfigProductSubTitle { get; set; }
        public decimal? ConfigProductSubPrice { get; set; }
        public string ConfigProductSubDescription { get; set; }
        public string Address { get; set; }
        public string Code { get; set; }
    }
}
