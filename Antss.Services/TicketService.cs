using Antss.Data;
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

        public async Task<List<TicketListItem>> GetList()
        {
            return await _db.Tickets.AsNoTracking()
                .Include(x => x.RaisedBy)
                .Include(x => x.AssignedTo)
                .Select(x => new TicketListItem
                {
                    Id = x.Id,
                    AssignedTo = x.AssignedTo.DisplayName,
                    Description = x.Description,
                    RaisedBy = x.RaisedBy.DisplayName,
                    TicketStatus = _enumTransformer.GetEnumMemberAttributeValue(x.TicketStatus)
                }).ToListAsync();
        }

        public async Task<int> Create(CreateTicketDto ticketDto)
        {
            var newTicket = new Ticket
            {
                RaisedById = ticketDto.RaisedById,
                AssignedToId = ticketDto.AssignedToId,
                TicketStatus = Model.TicketStatuses.Raised,
                Description = ticketDto.Description
            };

            _db.Tickets.Add(newTicket);
            await _db.SaveChangesAsync();

            return newTicket.Id;
        }
    }
}
