using Antss.Data;
using Antss.Model.Entities;
using Antss.Model.Enums;
using Antss.Services.Common;
using Antss.Services.Contracts.CommonContracts;
using Antss.Services.Contracts.UserContracts;

namespace Antss.Services
{
    public class AuthenticationService
    {
        private readonly AntssContext _db;
        private readonly Encryptor _encryptor;
        
        private bool _loggedIn;
        private LoginResult _loginResult = new LoginResult();
        private User _user;

        public AuthenticationService(AntssContext db, Encryptor encryptor)
        {
            _db = db;
            _encryptor = encryptor;
        }

        public LoginResult Login(LoginCredential loginCredential)
        {
            if (loginCredential.EmailAddress != null)
                LoginWithCredentials(loginCredential.EmailAddress, loginCredential.Password);
            else
                LoginWithToken(loginCredential.AccessToken);

            if (!_loggedIn) return _loginResult;

            _loginResult.User = new UserDto
            {
                Id = _user.Id,
                ContactNumber = _user.ContactNumber,
                EmailAddress = _user.EmailAddress,
                FirstName = _user.FirstName,
                LastName = _user.LastName,
                OfficeId = _user.OfficeId,
                UserTypeId = (int)_user.UserType,
                UserType = _user.UserType.ToString(),
            };

            return _loginResult;
        }

        private void LoginWithCredentials(string emailAddress, string password)
        {
            var loginResult = new LoginResult();

            var user = _db.Users.FirstOrDefault(x => x.EmailAddress == emailAddress);

            if (user == null) return;

            if (!_encryptor.VerifyHashedPassword(user.Password, password)) return;

            var accessToken = Guid.NewGuid();
            _loginResult.AccessToken = accessToken;
            user.AccessToken = accessToken;
            user.AccessTokenExpiryUtc = DateTime.UtcNow.AddDays(7);
            _db.SaveChanges();

            _user = user;
            _loggedIn = true;
        }

        private void LoginWithToken(string accessToken)
        {
            var loginResult = new LoginResult();

            var user = _db.Users.SingleOrDefault(x => x.AccessToken == Guid.Parse(accessToken));

            if (user == null || user.AccessTokenExpiryUtc < DateTime.UtcNow) return;

            _user = user;
            _loggedIn = true;
        }
    }
}
