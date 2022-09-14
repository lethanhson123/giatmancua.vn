using System;
using System.Collections.Generic;

namespace VNPT2021.Data.Models
{
    public partial class BlogFile : BaseModel
    {        
        public string Title { get; set; }
        public string URLCode { get; set; }
        public string Image { get; set; }
        public string URLImage { get; set; }        
    }
}
