using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using domain;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using persistence;

namespace api
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            
            using var scope = host.Services.CreateScope();

            try
            {
                var dataContext = scope.ServiceProvider.GetService<DataContext>();
                await dataContext.Database.MigrateAsync();
                await Seed.SeedData(dataContext, scope.ServiceProvider.GetService<UserManager<AppUser>>());
            }
            catch (Exception e)
            {
                var logger = scope.ServiceProvider.GetService<Logger<Program>>();

                logger.LogCritical("Error running migrations: " + e);

                throw;
            }
            
            await host.RunAsync();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
