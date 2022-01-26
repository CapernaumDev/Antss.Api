using Newtonsoft.Json;

namespace Antss.Model.Entities
{
    public class User
    {
        public int Id { get; set; }        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserTypes UserType { get; set; }
        public int OfficeId { get; set; }
        public Office? Office { get; set; }
        public string ContactNumber { get; set; }
        public string EmailAddress { get; set; }

        public string DisplayName => LastName + ", " + FirstName;

        // TODO: Remove JsonIgnore once ticket service uses contracts instead of entities
        // And remove Newtonsoft from this asseembly
        [JsonIgnore]
        public IEnumerable<Ticket>? AssignedTickets { get; set; } = new List<Ticket>();
    }
}