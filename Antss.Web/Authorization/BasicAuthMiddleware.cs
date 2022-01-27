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
            var credentialBytes = Convert.FromBase64String(authHeader.Parameter);
            var credentials = Encoding.UTF8.GetString(credentialBytes).Split(':', 2);

            int.TryParse(credentials[0], out var userId);
            var accessToken = string.IsNullOrWhiteSpace(credentials[1]) ? (Guid?)null : Guid.Parse(credentials[1]);

            var connectionstring = _configuration.GetConnectionString("DefaultConnection");
            var optionsBuilder = new DbContextOptionsBuilder<AntssContext>();
            optionsBuilder.UseSqlServer(connectionstring);

            using (var db = new AntssContext(optionsBuilder.Options))
            {
                var user = accessToken == null ?
                    await db.Users.SingleOrDefaultAsync(x => x.Id == userId) :
                    await db.Users.SingleOrDefaultAsync(x => x.AccessToken == accessToken);

                if (user != null && user.AccessTokenExpiryUtc > DateTime.UtcNow)
                {
                    context.Items["User"] = user;
                }
            }
        }
        catch (Exception ex)
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
