namespace Antss.Web.Authorization;

using Antss.Model.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AdminAuthorizeAttribute : AuthorizeAttribute, IAuthorizationFilter
{
    public new void OnAuthorization(AuthorizationFilterContext context)
    {
        base.OnAuthorization(context);

        var user = (User?)context.HttpContext.Items["User"];
        if (user == null || user.UserType != Model.UserTypes.Admin)
        {
            // not logged in - return 401 unauthorized
            context.Result = new JsonResult(new { message = "Unauthorized" }) { StatusCode = StatusCodes.Status401Unauthorized };

            // set 'WWW-Authenticate' header to trigger login popup in browsers
            context.HttpContext.Response.Headers["WWW-Authenticate"] = "Basic realm=\"\", charset=\"UTF-8\"";
        }
    }
}