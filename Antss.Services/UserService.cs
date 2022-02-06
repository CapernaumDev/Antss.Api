using Antss.Data;
using Antss.Model;
using Antss.Model.Entities;
using Antss.Model.Enums;
using Antss.Services.Common;
using Antss.Services.Contracts.CommonContracts;
using Antss.Services.Contracts.UserContracts;
using Microsoft.EntityFrameworkCore;

namespace Antss.Services
{
    public class UserService
    {
        private readonly AntssContext _db;
        private readonly Encryptor _encryptor;
        private readonly EnumTransformer _enumTransformer;

        public UserService(AntssContext db, Encryptor encryptor, EnumTransformer enumTransformer)
        {
            _db = db;
            _encryptor = encryptor;
            _enumTransformer = enumTransformer;
        }

        public async Task<List<UserListItem>> GetList()
        {
            return await _db.Users.AsNoTracking().Include(x => x.Office)
                .Select(x => new UserListItem
                {
                    Id = x.Id,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    OfficeName = x.Office == null ? "" : x.Office.Name,
                    UserType = x.UserType.ToString()
                }).ToListAsync();
        }

        public async Task<UserDto> GetById(int id)
        {
            return await _db.Users
                .Where(x => x.Id == id)
                .Select(x => new UserDto
                {
                    Id = id,
                    ContactNumber = x.ContactNumber,
                    EmailAddress = x.EmailAddress,
                    FirstName = x.FirstName,
                    LastName = x.LastName,
                    OfficeId = x.OfficeId,
                    UserTypeId = (int)x.UserType
                }).FirstAsync();
        }

        public async Task<(PostResult PostResult, UserListItem User)> Create(UserDto userDto)
        {
            var userToSave = new User
            {
                ContactNumber = userDto.ContactNumber,
                EmailAddress = userDto.EmailAddress,
                FirstName = userDto.FirstName,
                LastName = userDto.LastName,
                OfficeId = userDto.OfficeId,
                UserType = (UserTypes)userDto.UserTypeId,
                Password = _encryptor.HashPassword(userDto.Password)
            };

            _db.Users.Add(userToSave);
            await _db.SaveChangesAsync();
            await _db.Entry(userToSave).ReloadAsync();

            var returnUser = new UserListItem
            {
                Id = userToSave.Id,
                FirstName = userToSave.FirstName,
                LastName = userToSave.LastName,
                OfficeName = userToSave.Office == null ? "" : userToSave.Office.Name,
                UserType = userToSave.UserType.ToString()
            };

            return (new PostResult(), returnUser);
        }

        public async Task<(PostResult PostResult, UserListItem? User)> Update(UserDto userDto)
        {
            var result = new PostResult();
            var existingUser = _db.Users
                .Include(x => x.AssignedTickets)
                .Include(x => x.Office)
                .Single(x => x.Id == userDto.Id);

            if ((UserTypes)userDto.UserTypeId == UserTypes.User &&
                (existingUser.UserType == UserTypes.Support || existingUser.UserType == UserTypes.Admin))
            {
                if (existingUser.AssignedTickets.Any())
                {
                    //user was changed from support/admin to user UserType but they have tickets assigned
                    //which is not valid for a UserType of user
                    result.ErrorMessage = "User Type cannot be changed to 'User' because the user has tickets assigned.";
                    return (result, null);
                }
            }

            existingUser.UserType = (UserTypes)userDto.UserTypeId;
            existingUser.LastName = userDto.LastName;
            existingUser.FirstName = userDto.FirstName;
            existingUser.ContactNumber = userDto.ContactNumber;
            existingUser.EmailAddress = userDto.EmailAddress;
            existingUser.OfficeId = userDto.OfficeId;

            await _db.SaveChangesAsync();
            var updatedUser = await _db.Users.AsNoTracking().Include(x => x.Office).FirstAsync(x => x.Id == existingUser.Id);

            var returnUser = new UserListItem
            {
                Id = updatedUser.Id,
                FirstName = updatedUser.FirstName,
                LastName = updatedUser.LastName,
                OfficeName = updatedUser.Office == null ? "" : updatedUser.Office.Name,
                UserType = updatedUser.UserType.ToString()
            };
            
            return (result, returnUser);
        }

        public async Task<IEnumerable<OptionItem>> GetAssignableUserOptions()
        {
            return await _db.Users.AsNoTracking()
                .Where(x => x.UserType == UserTypes.Support || x.UserType == UserTypes.Admin)
                .OrderBy(x => x.LastName).ThenBy(x => x.FirstName)
                .Select(x => new OptionItem(x.Id, x.DisplayName)).ToListAsync();
        }

        public async Task<AppData> GetAppData(IUserIdentity user)
        {
            var appData = new AppData
            {
                AssignableUsers = await _db.Users
                    .Where(x => x.UserType == UserTypes.Support || x.UserType == UserTypes.Admin)
                    .OrderBy(x => x.LastName).ThenBy(x => x.FirstName)
                    .Select(x => new OptionItem(x.Id, x.DisplayName))
                    .ToListAsync()
            };

            if (user.UserType == UserTypes.Admin)
            {
                appData.Offices = await _db.Offices.AsNoTracking()
                    .Select(x => new OptionItem(x.Id, x.Name)).ToListAsync();

                appData.UserTypes = _enumTransformer.ToFormattedCollection<UserTypes>();
            }

            return appData;
        }
    }
}
