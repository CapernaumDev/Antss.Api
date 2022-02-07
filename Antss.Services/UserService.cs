using Antss.Data;
using Antss.Model;
using Antss.Model.Entities;
using Antss.Model.Enums;
using Antss.Services.Common;
using Antss.Services.Contracts.CommonContracts;
using Antss.Services.Contracts.UserContracts;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Antss.Services
{
    public class UserService
    {
        private readonly AntssContext _db;
        private readonly Encryptor _encryptor;
        private readonly EnumTransformer _enumTransformer;
        private readonly IMapper _mapper;

        public UserService(AntssContext db, Encryptor encryptor, EnumTransformer enumTransformer, IMapper mapper)
        {
            _db = db;
            _encryptor = encryptor;
            _enumTransformer = enumTransformer;
            _mapper = mapper;
        }

        public async Task<List<UserListItem>> GetList()
        {
            return await _mapper.ProjectTo<UserListItem>(
                _db.Users.AsNoTracking().Include(x => x.Office)).ToListAsync();
        }

        public async Task<UserListItem> GetListItem(int id)
        {
            return await _mapper.ProjectTo<UserListItem>(
                _db.Users.AsNoTracking().Include(x => x.Office)).FirstAsync(x => x.Id == id);
        }

        public async Task<UserDto> GetById(int id)
        {
            return await _mapper.ProjectTo<UserDto>(
                _db.Users.AsNoTracking()).FirstAsync(x => x.Id == id);
        }

        public async Task<int> Create(UserDto userDto)
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

            return userToSave.Id;
        }

        public async Task<PostResult> Update(UserDto userDto)
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
                    return result;
                }
            }

            existingUser.UserType = (UserTypes)userDto.UserTypeId;
            existingUser.LastName = userDto.LastName;
            existingUser.FirstName = userDto.FirstName;
            existingUser.ContactNumber = userDto.ContactNumber;
            existingUser.EmailAddress = userDto.EmailAddress;
            existingUser.OfficeId = userDto.OfficeId;

            await _db.SaveChangesAsync();

            return result;
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
