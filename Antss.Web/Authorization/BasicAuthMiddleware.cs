namespace Antss.Web.Authorization;

using Antss.Data;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using System.Text;

public class BasicAuthMiddleware
{
    private readonly RequestDelegate _next; 
    private readonly IConfiguration _configuration;

    public BasicAuthMiddleware(RequestDelegate next, IConfiguration configuration)
    {
        _next = next;
        _configuration = configuration;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            var authHeader = AuthenticationHeaderValue.Parse(context.Request.Headers["Authorization"]);
            if (authHeader.Parameter == null) return;

            var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
            var credentials = Encoding.UTF8.GetString(credentialBytes).Split(':', 2);
            var username = credentials[0];
            var password = credentials[1];

            var connectionstring = _configuration.GetConnectionString("DefaultConnection");
            var optionsBuilder = new DbContextOptionsBuilder<AntssContext>();
            optionsBuilder.UseSqlServer(connectionstring);

            using (var db = new AntssContext(optionsBuilder.Options))
            {
                var user = await db.Users.SingleOrDefaultAsync(x => x.Id == int.Parse(username));
                context.Items["User"] = user;
            }
        }
        catch
        {
            // do nothing if invalid auth header
            // user is not attached to context so request won't have access to secure routes
        }

        await _next(context);
    }
}

public static class BasicAuthMiddlewareExtensions
{
    public static IApplicationBuilder UseBasicAuthMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<BasicAuthMiddleware>();
    }
}
