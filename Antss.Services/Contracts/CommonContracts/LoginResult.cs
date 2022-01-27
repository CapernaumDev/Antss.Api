using Antss.Services.Contracts.UserContracts;

namespace Antss.Services.Contracts.CommonContracts
{
    public class LoginResult
    {
        public AppData? AppData { get; set; }
        public UserDto? User { get; set; }
        public Guid? AccessToken { get; set; }
        public bool IsValid => User != null;
    }
}
