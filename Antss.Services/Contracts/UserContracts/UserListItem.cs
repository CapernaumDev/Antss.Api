namespace Antss.Services.Contracts.UserContracts
{
    public class UserListItem
    {
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? UserType { get; set; }
        public string? OfficeName { get; set; }
    }
}