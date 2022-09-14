using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace VNPT2021.Data.Models
{
    public partial class VNPTContext : DbContext
    {
        public VNPTContext()
        {
        }

        public VNPTContext(DbContextOptions<VNPTContext> options)
            : base(options)
        {
        }

        
        public virtual DbSet<VNPT2021.Data.Models.Membership> Membership { get; set; }
        public virtual DbSet<VNPT2021.Data.Models.Blog> Blog { get; set; }
        public virtual DbSet<VNPT2021.Data.Models.BlogCategory> BlogCategory { get; set; }
        public virtual DbSet<VNPT2021.Data.Models.BlogComment> BlogComment { get; set; }
        public virtual DbSet<VNPT2021.Data.Models.BlogFile> BlogFile { get; set; }
        public virtual DbSet<VNPT2021.Data.Models.BlogTag> BlogTag { get; set; }
        public virtual DbSet<VNPT2021.Data.Models.Customer> Customer { get; set; }
        public virtual DbSet<VNPT2021.Data.Models.Contact> Contact { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(VNPT2021.Helpers.AppGlobal.SQLServerConectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
