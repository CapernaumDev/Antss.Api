using Antss.Data;
using Antss.Model;
using Antss.Model.Entities;
using Antss.Model.Enums;
using Antss.Services.Contracts.TicketContracts;
using Microsoft.EntityFrameworkCore;

namespace Antss.Services
{
    public class TicketService
    {
        private readonly AntssContext _db;
        private readonly EnumTransformer _enumTransformer;

        public TicketService(AntssContext db, EnumTransformer enumTransformer)
        {
            _db = db;
            _enumTransformer = enumTransformer;
        }

        public async Task<List<TicketListItem>> GetList(User user)
        {
            var query = _db.Tickets.AsNoTracking()
                .Include(x => x.RaisedBy)
                .Include(x => x.AssignedTo).AsQueryable();

            if (user.UserType == UserTypes.User)
                query = query.Where(x => x.RaisedById == user.Id);

            return await query.Select(x => new TicketListItem
            {
                Id = x.Id,
                AssignedTo = x.AssignedTo.DisplayName,
                Description = x.Description,
                RaisedBy = x.RaisedBy.DisplayName,
                TicketStatus = _enumTransformer.GetEnumMemberAttributeValue(x.TicketStatus)
            }).ToListAsync();
        }

        public async Task<int> Create(CreateTicketDto ticketDto, User raisedBy)
        {
            //TODO: permissions based authorization
            var canAssignOnCreation = raisedBy.UserType == UserTypes.Admin || raisedBy.UserType == UserTypes.Support;

            var newTicket = new Ticket
            {
                RaisedById = raisedBy.Id,
                AssignedToId = canAssignOnCreation ? ticketDto.AssignedToId : null,
                TicketStatus = TicketStatuses.Raised,
                Description = ticketDto.Description
            };

            _db.Tickets.Add(newTicket);
            await _db.SaveChangesAsync();

            return newTicket.Id;
        }
    }
}
