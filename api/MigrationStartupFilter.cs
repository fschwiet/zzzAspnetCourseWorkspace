using System;
using domain;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using persistence;

namespace api
{
    public class MigrationStartupFilter<TContext> : IStartupFilter where TContext : DbContext
    {
        public MigrationStartupFilter()
        {
        }

        public Action<IApplicationBuilder> Configure(Action<IApplicationBuilder> next)
        {
            return app =>
            {
                using (var scope = app.ApplicationServices.CreateScope())
                {
                    var dataContext = scope.ServiceProvider.GetService<DataContext>();
                    var userManager = scope.ServiceProvider.GetService<UserManager<AppUser>>();

                    dataContext.Database.SetCommandTimeout(160);
                    dataContext.Database.Migrate();
                    Seed.SeedData(dataContext, userManager).Wait();
                }

                next(app);
            };
        }
    }
}