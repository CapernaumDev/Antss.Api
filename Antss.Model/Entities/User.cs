namespace Antss.Model.Entities
{
    public class User : EntityBase
    {
        public int Id { get; set; }        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserTypes UserType { get; set; }
        public int OfficeId { get; set; }
        public Office? Office { get; set; }
        public string ContactNumber { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }

        public string DisplayName => LastName + ", " + FirstName;

        public ICollection<Ticket>? AssignedTickets { get; set; } = new List<Ticket>();
        public ICollection<UserSession> Sessions { get; set; } = new List<UserSession>();
    }
}