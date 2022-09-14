using System;
using System.Collections.Generic;

namespace VNPT2021.Data.Models
{
    public partial class Blog : BaseModel
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
        public string Facebook { get; set; }
        public string FacebookDisplay { get; set; }
        public string FacebookHTML { get; set; }
        public string Twitter { get; set; }
        public string TwitterDisplay { get; set; }
        public string TwitterHTML { get; set; }
        public string Instagram { get; set; }
        public string InstagramDisplay { get; set; }
        public string InstagramHTML { get; set; }
        public string Pinterest { get; set; }
        public string PinterestDisplay { get; set; }
        public string PinterestHTML { get; set; }
        public DateTime? DatePost { get; set; }
        public string DatePostDisplay { get; set; }
        public string Author { get; set; }
        public string QuoteDescription { get; set; }
        public string QuoteAuthor { get; set; }
        public int? SortOrder { get; set; }
        public bool? IsBanner { get; set; }
    }
}
