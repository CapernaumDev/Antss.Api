﻿// <auto-generated />
using System;
using Antss.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Antss.Data.Migrations
{
    [DbContext(typeof(AntssContext))]
    partial class AntssContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder, 1L, 1);

            modelBuilder.Entity("Antss.Model.Office", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("Id");

                    b.ToTable("Office");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Office 1"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Office 2"
                        });
                });

            modelBuilder.Entity("Antss.Model.Ticket", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<int?>("AssignedToId")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RaisedById")
                        .HasColumnType("int");

                    b.Property<int>("TicketStatus")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("AssignedToId");

                    b.HasIndex("RaisedById");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("Antss.Model.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"), 1L, 1);

                    b.Property<string>("ContactNumber")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("EmailAddress")
                        .IsRequired()
                        .HasMaxLength(254)
                        .HasColumnType("nvarchar(254)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<int>("OfficeId")
                        .HasColumnType("int");

                    b.Property<int>("UserType")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("OfficeId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ContactNumber = "foo",
                            EmailAddress = "foo",
                            FirstName = "Adam",
                            LastName = "Smith",
                            OfficeId = 1,
                            UserType = 3
                        },
                        new
                        {
                            Id = 2,
                            ContactNumber = "foo",
                            EmailAddress = "foo",
                            FirstName = "John",
                            LastName = "Jones",
                            OfficeId = 2,
                            UserType = 2
                        },
                        new
                        {
                            Id = 3,
                            ContactNumber = "foo",
                            EmailAddress = "foo",
                            FirstName = "Peter",
                            LastName = "Taylor",
                            OfficeId = 2,
                            UserType = 1
                        });
                });

            modelBuilder.Entity("Antss.Model.Ticket", b =>
                {
                    b.HasOne("Antss.Model.User", "AssignedTo")
                        .WithMany()
                        .HasForeignKey("AssignedToId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Antss.Model.User", "RaisedBy")
                        .WithMany()
                        .HasForeignKey("RaisedById")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AssignedTo");

                    b.Navigation("RaisedBy");
                });

            modelBuilder.Entity("Antss.Model.User", b =>
                {
                    b.HasOne("Antss.Model.Office", "Office")
                        .WithMany()
                        .HasForeignKey("OfficeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Office");
                });
#pragma warning restore 612, 618
        }
    }
}
