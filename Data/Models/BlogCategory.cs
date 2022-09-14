using System;
using System.Collections.Generic;

namespace VNPT2021.Data.Models
{
    public partial class BlogCategory : BaseModel
    {
        public string Code { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string HTMLContent { get; set; }
        public string URLCode { get; set; }
        public string METAKeyword { get; set; }
        public string METADescription { get; set; }
        public string Image { get; set; }
        public string URLImage { get; set; }
        public int? SortOrder { get; set; }
        public int? BlogCount { get; set; }
        public int? BlogCountActive { get; set; }
    }
}
