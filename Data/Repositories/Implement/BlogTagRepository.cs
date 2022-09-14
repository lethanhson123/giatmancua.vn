﻿using VNPT2021.Data.Helpers;
using VNPT2021.Data.Models;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using VNPT2021.Helpers;

namespace VNPT2021.Data.Repositories
{
    public class BlogTagRepository : Repository<BlogTag>, IBlogTagRepository
    {
        private readonly VNPTContext _context;

        public BlogTagRepository(VNPTContext context) : base(context)
        {
            _context = context;
        }     
    }
}
