using System;
using System.Collections.Generic;

namespace VNPT2021.Data.Models
{
    public partial class Contact : BaseModel
    {
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Description { get; set; }
        public DateTime? DatePost { get; set; }
        public string Code { get; set; }
    }
}
