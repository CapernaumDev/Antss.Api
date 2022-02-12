using Antss.Model;
using System.Security.Claims;
using System.Security.Principal;

namespace Antss.Api.Authorization
{
    public static class IdentityExtensions
    {
        public static int UserId(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("UserId");
            return int.Parse(claim.Value);
        }

        public static UserTypes UserType(this IIdentity identity)
        {
            var claim = ((ClaimsIdentity)identity).FindFirst("UserTypeId");
            return (UserTypes)int.Parse(claim.Value);
        }

        public static UserIdentity ToUserIdentity(this IIdentity identity)
        {
            return new UserIdentity
            {
                UserId = identity.UserId(),
                UserType = identity.UserType()
            };
        }
    }
}
