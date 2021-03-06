using Antss.Model.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Antss.Data.EntityMappings 
{
    public class UserMapping : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.HasKey(x => x.Id);
            builder.Property(x => x.UserType).HasConversion<int>();
            builder.Property(x => x.ContactNumber).HasMaxLength(50);
            builder.Property(x => x.EmailAddress).HasMaxLength(254);
            builder.Property(x => x.FirstName).HasMaxLength(20);
            builder.Property(x => x.LastName).HasMaxLength(20);
            builder.Property(x => x.Password).HasMaxLength(2048);
            builder.Ignore(x => x.DisplayName);
            builder.HasIndex(x => x.UserType);
            builder.HasOne(x => x.Office).WithMany().HasForeignKey(x => x.OfficeId);
            builder.HasMany(x => x.AssignedTickets).WithOne(x => x.AssignedTo).HasForeignKey(x => x.AssignedToId);
            builder.HasMany(x => x.Sessions).WithOne(x => x.User).HasForeignKey(x => x.UserId);
        }
    }
}
