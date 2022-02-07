using Antss.Model.Entities;
using Antss.Model.Enums;
using Antss.Services.Contracts.TicketContracts;
using Antss.Services.Contracts.UserContracts;
using AutoMapper;

namespace Antss.Services.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            var enumTransformer = new EnumTransformer();

            CreateMap<User, UserListItem>();
            
            CreateMap<User, UserDto>()
                .ForMember(x => x.Password, y => y.Ignore())
                .ForMember(x => x.UserTypeId, y => y.MapFrom(x => (int)x.UserType));

            CreateMap<Ticket, TicketListItem>()
                .ForMember(x => x.RaisedBy, y => y.MapFrom(x => x.RaisedBy.DisplayName))
                .ForMember(x => x.AssignedTo, y => y.MapFrom(x => x.AssignedTo.DisplayName))
                .ForMember(x => x.TicketStatus, y => y.MapFrom(x =>
                    enumTransformer.GetEnumMemberAttributeValue(x.TicketStatus)))
                .ForMember(x => x.TicketStatusId, y => y.MapFrom(x => (int)x.TicketStatus));
                
        }
    }
}
