﻿using Antss.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Antss.Data.EntityMappings 
{
    public class TicketMapping : IEntityTypeConfiguration<Ticket>
    {
        public void Configure(EntityTypeBuilder<Ticket> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.RaisedBy).WithMany().HasForeignKey(x => x.RaisedById);
            builder.Property(x => x.AssignedToId).IsRequired(false);
            builder.HasOne(x => x.AssignedTo).WithMany().HasForeignKey(x => x.AssignedToId);
            builder.Property(x => x.TicketStatus).HasConversion<int>();
            // Don't specify max length for Description, can be any length
        }
    }
}
