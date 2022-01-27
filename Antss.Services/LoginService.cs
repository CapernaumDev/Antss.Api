using Antss.Data;
using Antss.Model;
using Antss.Model.Enums;
using Antss.Services.Contracts.CommonContracts;
using Antss.Services.Contracts.UserContracts;
using Microsoft.EntityFrameworkCore;

namespace Antss.Services
{
    public class LoginService
    {
        private readonly AntssContext _db;
        private readonly EnumTransformer _enumTransformer;

        public LoginService(AntssContext db, EnumTransformer enumTransformer)
        {
            _db = db;
            _enumTransformer = enumTransformer;
        }

        public LoginResult Login(LoginCredential loginCredential)
        {
            var result = new LoginResult();
            var isLoginWithEmailAndPassword = loginCredential.EmailAddress != null;

            var foundUser = isLoginWithEmailAndPassword ?
                _db.Users.SingleOrDefault(x => x.EmailAddress == loginCredential.EmailAddress && x.Password == loginCredential.Password) :
                _db.Users.SingleOrDefault(x => x.AccessToken == Guid.Parse(loginCredential.AccessToken));

            if (foundUser == null) return result;

            Guid? accessToken = null;
            if (isLoginWithEmailAndPassword)
            {
                accessToken = Guid.NewGuid();
                foundUser.AccessToken = accessToken;
                foundUser.AccessTokenExpiryUtc = DateTime.UtcNow.AddDays(7);
                _db.SaveChanges();
            }

            var appData = new AppData
            {
                //here will go appdata relevant to all user types
            };

            if (foundUser.UserType == UserTypes.Admin)
            {
                appData.Offices = _db.Offices.AsNoTracking()
                    .Select(x => new OptionItem(x.Id, x.Name)).ToList();

                appData.UserTypes = _enumTransformer.ToFormattedCollection<UserTypes>();
            }

            return new LoginResult
            {
                User = new UserDto
                {
                    Id = foundUser.Id,
                    ContactNumber = foundUser.ContactNumber,
                    EmailAddress = foundUser.EmailAddress,
                    FirstName = foundUser.FirstName,
                    LastName = foundUser.LastName,
                    OfficeId = foundUser.OfficeId,
                    UserTypeId = (int)foundUser.UserType,
                    UserType = foundUser.UserType.ToString(),

                },
                AppData = appData,
                AccessToken = accessToken
            };
        }
    }
}
