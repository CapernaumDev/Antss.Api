namespace Antss.Web.Authorization;

using Antss.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AdminAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
{
    public new void OnAuthorization(AuthorizationFilterContext context)
    {
        base.OnAuthorization(context);

        if (context.HttpContext.User.Identity == null || 
            !context.HttpContext.User.Claims.Any() ||
            context.HttpContext.User.Identity.UserType() != UserTypes.Admin)
        {
            // not logged in - return 401 unauthorized
            context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };

            // set 'WWW-Authenticate' header to trigger login popup in browsers
            context.HttpContext.Response.Headers["WWW-Authenticate"] = "Basic realm=\"\", charset=\"UTF-8\"";
        }
    }
}