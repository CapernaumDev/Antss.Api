namespace Antss.Model.Entities
{
    public class UserSession
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public Guid AccessToken { get; set; }
        public DateTime AccessTokenExpiryUtc { get; set; }
        public string? UserAgent { get; set; }
        public string? OperatingSystem { get; set; }
        public string? Browser { get; set; }
        public string? Device { get; set; }
        public string? OperatingSystemVersion { get; set; }  
        public string? BrowserVersion { get; set; }
        public string? DeviceType { get; set; }
        public bool? IsDesktop { get; set; }
        public bool? IsTablet { get; set; }
        public bool? IsMobile { get; set; }

        public User User { get; set; }  
    }
}
