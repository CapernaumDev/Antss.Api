using Antss.Model.Entities;

namespace Antss.Services.Contracts
{
    public class LoginResult
    {
        public AppData? AppData { get; set; }
        public User? User { get; set; }
        public bool IsValid => User != null;
    }
}
