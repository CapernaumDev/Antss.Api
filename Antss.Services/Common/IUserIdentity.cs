using Antss.Model;

namespace Antss.Services.Common
{
    public interface IUserIdentity
    {
        public int UserId { get; set; }
        public UserTypes UserType { get; set; }
    }
}
