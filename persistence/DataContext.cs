using System.Diagnostics.CodeAnalysis;
using domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DataContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities {get; set;}
    }
} 