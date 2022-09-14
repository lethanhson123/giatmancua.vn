using System;
using System.Collections.Generic;
using System.Text;

namespace VNPT2021.Data.ViewModels
{
    public class BaseViewModel
    {
        public int? ID { get; set; }
        public string UrlCode { get; set; }
        public string QueryString { get; set; }
    }
}
