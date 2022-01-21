namespace Antss.Model
{
    public class User
    {
        public int Id { get; set; }        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public UserType UserType { get; set; }
        public string Location { get; set; }
        public string ContactNumber { get; set; }
        public string EmailAddress { get; set; }
    }
}