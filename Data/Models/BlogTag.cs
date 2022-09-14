using System;
using System.Collections.Generic;

namespace VNPT2021.Data.Models
{
    public partial class BlogTag : BaseModel
    {        
        public string Tag { get; set; }
        public string URLTag { get; set; }        
    }
}
