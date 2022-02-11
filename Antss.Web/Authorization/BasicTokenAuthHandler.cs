using Antss.Data;
using Antss.Services.Common;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.Net.Http.Headers;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Text.Encodings.Web;

namespace Antss.Web.Authorization
{
    public class BasicTokenAuthHandler
        : AuthenticationHandler<BasicTokenAuthSchemeOptions>
    {
        private const string InvalidTokenFormatMessage = "Access token not valid format.";
        private readonly IConfiguration _configuration;
        private readonly AntssContext _db;

        public BasicTokenAuthHandler(
            IOptionsMonitor<BasicTokenAuthSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            ISystemClock clock,
            IConfiguration configuration,
            AntssContext db)
            : base(options, logger, encoder, clock)
        {
            _configuration = configuration;
            _db = db;
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            string? rawAccessToken = null;
            
            if (Request.Headers.ContainsKey(HeaderNames.Authorization)) // HTTP request with basic token auth in header
            {
                var authHeader = AuthenticationHeaderValue.Parse(Request.Headers[HeaderNames.Authorization]);

                if (authHeader.Parameter == null)
                {
                    return Task.FromResult(AuthenticateResult.Fail(InvalidTokenFormatMessage));
                }

                rawAccessToken = authHeader.Parameter;
            }
            else if (Request.Query["access_token"].SingleOrDefault() != null) // WS request with basic token in querystring
            {
                rawAccessToken = Request.Query["access_token"][0];
            }

            if (rawAccessToken == null || !rawAccessToken.IsBase64String())
            {
                return Task.FromResult(AuthenticateResult.Fail(InvalidTokenFormatMessage));
            }

            var credentialBytes = Convert.FromBase64String(rawAccessToken);

            if (!Guid.TryParse(Encoding.UTF8.GetString(credentialBytes), out var accessToken))
            {
                return Task.FromResult(AuthenticateResult.Fail(InvalidTokenFormatMessage));
            }
    
            var session = _db.UserSessions.Include(x => x.User).FirstOrDefault(x => x.AccessToken == accessToken);

            if (session != null && session.AccessTokenExpiryUtc > DateTime.UtcNow)
            {
                var identity = new ClaimsIdentity(new List<Claim>
                {
                    new Claim("UserTypeId", ((int)session.User.UserType).ToString()),
                    new Claim("UserId", session.User.Id.ToString())
                }, nameof(BasicTokenAuthHandler));

                var principal = new ClaimsPrincipal(identity);
                var ticket = new AuthenticationTicket(principal, Scheme.Name);

                return Task.FromResult(AuthenticateResult.Success(ticket));
            }

            return Task.FromResult(AuthenticateResult.Fail("Access token not valid"));
        }
    }
}