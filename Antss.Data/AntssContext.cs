using Microsoft.EntityFrameworkCore;
using Antss.Model;
using System.Diagnostics;
using Antss.Model.Entities;

namespace Antss.Data
{
    public class AntssContext : DbContext
    {
        public AntssContext(DbContextOptions<AntssContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserSession> UserSessions { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Office> Offices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AntssContext).Assembly);
            SeedDataGenerator.Generate(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.LogTo(message => Debug.WriteLine(message));
    }
}