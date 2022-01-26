using Antss.Data;
using Antss.Model;
using Antss.Model.Enums;
using Antss.Services.Contracts.CommonContracts;
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

            return new LoginResult { User = foundUser, AppData = appData };
        }
    }
}
