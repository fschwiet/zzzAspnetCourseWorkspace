using System.Diagnostics.CodeAnalysis;
using domain;
using Microsoft.EntityFrameworkCore;

namespace persistence
{
    public class DataContext : DbContext
    {
        public DataContext([NotNullAttribute] DbContextOptions options) : base(options)
        {
        }

        public DbSet<Activity> Activities {get; set;}
    }
}