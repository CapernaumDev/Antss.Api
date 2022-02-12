using Antss.Model;
using Antss.Services.Common;
using Microsoft.AspNetCore.Identity;

namespace Antss.Api.Authorization
{
    public class UserIdentity : IdentityUser, IUserIdentity
    {
        public int UserId { get; set;}
        public UserTypes UserType { get; set;}
    }
}
