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

        public int UserTypeId
        {
            get
            {
                return (int)UserType;
            }
            set
            {
                UserType = (UserTypes)value;
            }
        }

        public IEnumerable<Ticket>? AssignedTickets { get; set; }
    }
}