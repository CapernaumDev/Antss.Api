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
            builder.HasOne(x => x.Office).WithMany().HasForeignKey(x => x.OfficeId);
        }
    }
}
