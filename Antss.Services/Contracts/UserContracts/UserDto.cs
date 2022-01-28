namespace Antss.Services.Contracts.UserContracts
{
    public class UserDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int OfficeId { get; set; }
        public string ContactNumber { get; set; }
        public string EmailAddress { get; set; }
        public int UserTypeId { get; set; }
        public string? UserType { get; set; }
        public string Password { get; set; }
    }
}
