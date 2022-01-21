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
        }
    }
}