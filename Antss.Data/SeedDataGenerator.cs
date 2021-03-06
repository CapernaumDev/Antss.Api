using Antss.Model;
using Antss.Model.Entities;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace Antss.Data
{
    internal static class SeedDataGenerator
    {
        public static void Generate(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Office>().HasData(
                 new { Id = 1, Name = "Office 1" },
                 new { Id = 2, Name = "Office 2" }
             );

            //password for all users is 'test'
            modelBuilder.Entity<User>().HasData(
                    new { Id = 1, FirstName = "Adam", LastName = "Smith", UserType = UserTypes.Admin, OfficeId = 1, ContactNumber = "foo", EmailAddress = "adam@foo.com", Password = "AN9E9yNXuji6LWGi1MxXBoml+81YNZ9I3evXWwl203n1SbndNydZvZALGUru2COlzw==" },
                    new { Id = 2, FirstName = "John", LastName = "Jones", UserType = UserTypes.Support, OfficeId = 2, ContactNumber = "foo", EmailAddress = "john@foo.com", Password = "ALlC854bivaKC4w9iH5CE/1Xezy29gcmX8xhoqnLUAsReYnb2VxEbE0GPrvJWhTxtw==" },
                    new { Id = 3, FirstName = "Peter", LastName = "Taylor", UserType = UserTypes.User, OfficeId = 2, ContactNumber = "foo", EmailAddress = "peter@foo.com", Password = "AHaYNZKBoiHHYOqmPE/K8c0q4tEHXBatfk1+mGNWEuuw+E2Khv2ECk8c4EbHriJmKQ==" }
                );

            var id = 4;
            var users = JsonConvert.DeserializeObject<List<dynamic>>(SeedData.Seed.UsersJson);
            modelBuilder.Entity<User>().HasData(
                    users.Select(x => new
                    {
                        Id = id++,
                        FirstName = x.firstName.ToString(),
                        LastName = x.lastName.ToString(),
                        UserType = UserTypes.User,
                        OfficeId = 1,
                        EmailAddress = x.emailAddress.ToString(),
                        ContactNumber = x.contactNumber.ToString(),
                        Password = "AHaYNZKBoiHHYOqmPE/K8c0q4tEHXBatfk1+mGNWEuuw+E2Khv2ECk8c4EbHriJmKQ==" // 'test'
                    }));

            modelBuilder.Entity<Ticket>().HasData(
                    new { Id = 1, RaisedById = 3, AssignedToId = 2, TicketStatus = TicketStatuses.Raised, Title = "No monitor display", Description = "test" },
                    new { Id = 2, RaisedById = 3, AssignedToId = 1, TicketStatus = TicketStatuses.Completed, Title = "No Wi-Fi", Description = "test" },
                    new { Id = 3, RaisedById = 3, TicketStatus = TicketStatuses.InProgress, Title = "Emails not sending", Description = "test" },
                    new { Id = 4, RaisedById = 4, TicketStatus = TicketStatuses.Raised, Title = "Virus?", Description = "test" },
                    new { Id = 5, RaisedById = 4, TicketStatus = TicketStatuses.Raised, Title = "Printer won't print", Description = "test" },
                    new { Id = 6, RaisedById = 4, TicketStatus = TicketStatuses.Raised, Title = "Can't access reddit", Description = "test" },
                    new { Id = 7, RaisedById = 5, TicketStatus = TicketStatuses.Raised, Title = "issue with email", Description = "test" },
                    new { Id = 8, RaisedById = 5, TicketStatus = TicketStatuses.Raised, Title = "No WiFi", Description = "test" },
                    new { Id = 9, RaisedById = 6, TicketStatus = TicketStatuses.Raised, Title = "Proto app is crashing when I login", Description = "test" },
                    new { Id = 10, RaisedById = 7, TicketStatus = TicketStatuses.Raised, Title = "why doesn't reddit work any more?", Description = "test" },
                    new { Id = 11, RaisedById = 7, TicketStatus = TicketStatuses.Raised, Title = "Wifi issues", Description = "test" },
                    new { Id = 12, RaisedById = 7, TicketStatus = TicketStatuses.Raised, Title = "Can't login", Description = "test" }
                );

            var ticketId = 13;
            var userId = 4;
            var tickets = JsonConvert.DeserializeObject<List<dynamic>>(SeedData.Seed.TicketsJson);
            
            modelBuilder.Entity<Ticket>().HasData(
                tickets.Select(x => new
                {
                    Id = ticketId++,
                    RaisedById = userId++,
                    AssignedToId = 2,
                    TicketStatus = TicketStatuses.Completed,
                    Title = x.description.ToString().Substring(0, x.description.ToString().Length > 49 ? 50 : x.description.ToString().Length),
                    Description = x.description.ToString()
                }));
        }

    }
}
