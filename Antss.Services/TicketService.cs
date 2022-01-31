using Antss.Data;
using Antss.Model;
using Antss.Model.Entities;
using Antss.Model.Enums;
using Antss.Services.Contracts.CommonContracts;
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

            query = ApplySecurityRules(query, user);

            return await query.Select(x => new TicketListItem
            {
                Id = x.Id,
                AssignedTo = x.AssignedTo.DisplayName,
                Description = x.Description,
                RaisedBy = x.RaisedBy.DisplayName,
                TicketStatus = _enumTransformer.GetEnumMemberAttributeValue(x.TicketStatus),
                TicketStatusId = (int)x.TicketStatus
            }).ToListAsync();
        }

        public async Task<List<BoardColumn<TicketListItem>>> GetBoard(User user)
        {
            var query = _db.Tickets.AsNoTracking()
                .Include(x => x.RaisedBy)
                .Include(x => x.AssignedTo).AsQueryable();

            query = ApplySecurityRules(query, user);

            return await query.GroupBy(x => x.TicketStatus)
                .Select(x => new BoardColumn<TicketListItem>
                {
                    Title = _enumTransformer.GetEnumMemberAttributeValue(x.Key),
                    Id = (int)x.Key,
                    Data = x.Select(y => new TicketListItem
                    {
                        Id = y.Id,
                        AssignedTo = y.AssignedTo.DisplayName,
                        Description = y.Description,
                        RaisedBy = y.RaisedBy.DisplayName,
                        TicketStatus = _enumTransformer.GetEnumMemberAttributeValue(y.TicketStatus),
                        TicketStatusId = (int)y.TicketStatus
                    })
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
        
        private IQueryable<Ticket> ApplySecurityRules(IQueryable<Ticket> query, User user)
        {
            if (user.UserType == UserTypes.User)
                query = query.Where(x => x.RaisedById == user.Id);

            return query;
        }
    }
}
