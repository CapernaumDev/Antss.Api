using Microsoft.EntityFrameworkCore;
using Antss.Model;
using System.Diagnostics;

namespace Antss.Data
{
    public class AntssContext : DbContext
    {
        public AntssContext(DbContextOptions<AntssContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Office> Offices { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AntssContext).Assembly);

            modelBuilder.Entity<Office>().HasData(
                    new { Id = 1, Name = "Office 1" },
                    new { Id = 2, Name = "Office 2" }
                );

            modelBuilder.Entity<User>().HasData(
                    new { Id = 1, FirstName = "Adam", LastName = "Smith", UserType = UserTypes.Admin, OfficeId = 1, ContactNumber = "foo", EmailAddress = "foo" },
                    new { Id = 2, FirstName = "John", LastName = "Jones", UserType = UserTypes.Support, OfficeId = 2, ContactNumber = "foo", EmailAddress = "foo" },
                    new { Id = 3, FirstName = "Peter", LastName = "Taylor", UserType = UserTypes.User, OfficeId = 2, ContactNumber = "foo", EmailAddress = "foo" }
                );

            modelBuilder.Entity<Ticket>().HasData(
                    new { Id = 1, RaisedById = 3, AssignedToId = 2, TicketStatus = TicketStatuses.Raised, Description = "No monitor display" },
                    new { Id = 2, RaisedById = 3, AssignedToId = 1, TicketStatus = TicketStatuses.Completed, Description = "No Wi-Fi" },
                    new { Id = 3, RaisedById = 3, TicketStatus = TicketStatuses.InProgress, Description = "Emails not sending" }
                );
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.LogTo(message => Debug.WriteLine(message));
    }
}