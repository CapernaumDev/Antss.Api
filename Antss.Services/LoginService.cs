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

        public LoginResult Login(LoginCredential login)
        {
            //we're just going to get the user for now without authenticating
            var result = new LoginResult();

            var foundUser = _db.Users.SingleOrDefault(x => x.Id == login.UserId);
            if (foundUser == null) return result;

            var accessToken = new Guid();
            foundUser.AccessToken = accessToken;
            foundUser.AccessTokenExpiryUtc = DateTime.UtcNow.AddDays(7);
            _db.SaveChanges();

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
