using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using VNPT2021.Data.Models;

namespace VNPT2021.Data.DataTransfer
{
    public partial class MembershipDataTransfer : Membership
    {
        public DateTime? DateEnd { get; set; }
        public string NguoiXuLyFullName { get; set; }
    }
}
