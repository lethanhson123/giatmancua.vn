using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VNPT2021.Data.Models;
using VNPT2021.Data.Repositories;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;   
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllers().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
            services.AddDbContext<VNPTContext>();            
            services.AddTransient<IMembershipRepository, MembershipRepository>();
            services.AddTransient<IBlogCategoryRepository, BlogCategoryRepository>();
            services.AddTransient<IBlogCommentRepository, BlogCommentRepository>();
            services.AddTransient<IBlogFileRepository, BlogFileRepository>();
            services.AddTransient<IBlogRepository, BlogRepository>();
            services.AddTransient<IBlogTagRepository, BlogTagRepository>();
            services.AddTransient<ICustomerRepository, CustomerRepository>();
            services.AddTransient<IContactRepository, ContactRepository>();
            services.AddCors();
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseCors(options =>
             options.AllowAnyOrigin()
             .AllowAnyMethod()
             .AllowAnyHeader());
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();               
            }
            app.UseSwagger();            
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "API v1"));
            app.UseRouting();

            app.UseAuthorization();

            app.UseStaticFiles();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
