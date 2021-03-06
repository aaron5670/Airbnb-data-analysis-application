using System.IO;
using AirBNB_React_App.Helpers;
using AirBNB_React_App.Repositories;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using StackExchange.Profiling;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using StackExchange.Redis;

namespace AirBNB_React_App
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
            services.AddControllersWithViews();

            services.AddResponseCompression();

            services.AddAuthentication(options => { options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; })
                .AddJwtBearer(options =>
                {
                    // note: the tenant id (authority) and client id (audience) 
                    // should normally be pulled from the config file or ENV vars.
                    // this code uses an inline example for brevity.

                    options.Authority = Configuration.GetValue<string>("AzureAd:Instance");
                    options.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidAudience = Configuration.GetValue<string>("AzureAd:ClientId")
                    };
                });

            services.AddDbContext<AirBNBContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("AIRBNB")));

            services.AddMiniProfiler(options =>
            {
                //Optional options
            });

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration => { configuration.RootPath = "ClientApp/build"; });
            services.AddTransient<IListingsRepository, ListingRepository>();
            services.AddTransient<IChartsRepository, ChartsRepository>();
            services.AddTransient<IListingCaching, ListingCache>();
            services.AddSingleton<IConnectionMultiplexer>(ConnectionMultiplexer.Connect(Configuration.GetConnectionString("Redis")));
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
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseResponseCompression();

            app.UseMiniProfiler();

            app.UseHttpsRedirection();

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapMiniProfilerIncludes(new RenderOptions
                {
                    StartHidden = true,
                    PopupToggleKeyboardShortcut = "Ctrl+m",
                });

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                // if (env.IsDevelopment())
                // {
                //     spa.UseReactDevelopmentServer(npmScript: "start");
                // }
            });
        }
    }
}