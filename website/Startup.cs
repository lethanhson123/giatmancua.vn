using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VNPT2021.Data.Models;
using VNPT2021.Data.Helpers;
using VNPT2021.Data.Repositories;
using System.Text.Encodings.Web;
using System.Text.Unicode;

namespace Website
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
            services.AddDbContext<VNPTContext>();
            services.AddTransient<IBlogCategoryRepository, BlogCategoryRepository>();
            services.AddTransient<IBlogCommentRepository, BlogCommentRepository>();
            services.AddTransient<IBlogFileRepository, BlogFileRepository>();
            services.AddTransient<IBlogRepository, BlogRepository>();
            services.AddTransient<IBlogTagRepository, BlogTagRepository>();            
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IMembershipRepository, MembershipRepository>();
            services.AddTransient<IMembershipAddressRepository, MembershipAddressRepository>();
            services.AddTransient<IContactRepository, ContactRepository>();
            services.AddSingleton<HtmlEncoder>(HtmlEncoder.Create(allowedRanges: new[] { UnicodeRanges.All }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                   name: "blogs",
                   pattern: "blogs/{URLCode}-{ID}.html",
                   defaults: new { controller = "Home", action = "Blogs" });

                endpoints.MapControllerRoute(
                  name: "blog",
                  pattern: "blog/{URLCode}-{ID}.html",
                  defaults: new { controller = "Home", action = "Blog" });               

                endpoints.MapControllerRoute(
                 name: "Contact",
                 pattern: "lien-he.html",
                 defaults: new { controller = "Home", action = "Contact" });

                endpoints.MapControllerRoute(
                name: "About",
                pattern: "gioi-thieu.html",
                defaults: new { controller = "Home", action = "About" });

                endpoints.MapControllerRoute(
               name: "Thank",
               pattern: "loi-cam-on.html",
               defaults: new { controller = "Home", action = "Thank" });

                endpoints.MapControllerRoute(
                name: "Tag",
                pattern: "tag/{searchString}",
                defaults: new { controller = "Home", action = "Tag" });

                endpoints.MapControllerRoute(
                name: "Registration",
                pattern: "dang-ky.html",
                defaults: new { controller = "Home", action = "Registration" });

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new Microsoft.AspNetCore.Localization.RequestCulture("vi-VN"),
            }); ; ;
        }
    }
}
