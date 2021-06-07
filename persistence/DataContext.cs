using System;
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
        public DbSet<ActivityAttendee> ActivityAttendees { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ActivityAttendee>().HasKey(e => new {e.AppUserId, e.ActivityId}); // ? Entity<>(x => x.HasKey...)

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(u  => u.Activities)
                .HasForeignKey(aa => aa.AppUserId);
                
            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.Activity)
                .WithMany(u  => u.Attendees)
                .HasForeignKey(aa => aa.ActivityId);
        }
    }
} 