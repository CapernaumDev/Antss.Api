using Microsoft.EntityFrameworkCore;
using Antss.Model;

namespace Antss.Data
{
    public class AntssContext : DbContext
    {
        public AntssContext(DbContextOptions<AntssContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().HasData(
                    new { Id = 1, FirstName = "Adam", LastName = "Smith", UserType = UserTypes.Admin, Location = "foo", ContactNumber = "foo", EmailAddress = "foo" },
                    new { Id = 2, FirstName = "John", LastName = "Jones", UserType = UserTypes.Support, Location = "foo", ContactNumber = "foo", EmailAddress = "foo" },
                    new { Id = 3, FirstName = "Peter", LastName = "Taylor", UserType = UserTypes.User, Location = "foo", ContactNumber = "foo", EmailAddress = "foo" }
                );
        }
    }
}