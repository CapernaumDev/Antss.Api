using Antss.Data;
using Antss.Model;
using Antss.Model.Entities;
using Antss.Model.Enums;
using Antss.Services.Common;
using Antss.Services.Contracts.CommonContracts;
using Antss.Services.Contracts.TicketContracts;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Antss.Services
{
    public class TicketService
    {
        private readonly AntssContext _db;
        private readonly EnumTransformer _enumTransformer;
        private readonly IMapper _mapper;

        public TicketService(AntssContext db, EnumTransformer enumTransformer, IMapper mapper)
        {
            _db = db;
            _enumTransformer = enumTransformer;
            _mapper = mapper;
        }

        public async Task<List<TicketListItem>> GetList(IUserIdentity user, bool includeClosed)
        {
            var query = _db.Tickets.AsNoTracking()
                .Include(x => x.RaisedBy)
                .Include(x => x.AssignedTo).AsQueryable();

            query = ApplyCommonTicketFilters(query, user, includeClosed);

            return await _mapper.ProjectTo<TicketListItem>(query).ToListAsync();
        }

        public async Task<TicketListItem> GetListItem(int id)
        {
            return await _mapper.ProjectTo<TicketListItem>(
                _db.Tickets.AsNoTracking()
                .Include(x => x.RaisedBy)
                .Include(x => x.AssignedTo).AsQueryable())
                .FirstAsync(x => x.Id == id);
        }

        public async Task<List<BoardColumn<TicketListItem>>> GetBoard(IUserIdentity user, bool includeClosed)
        {
            var query = _db.Tickets.AsNoTracking()
                .Include(x => x.RaisedBy)
                .Include(x => x.AssignedTo).AsQueryable();

            query = ApplyCommonTicketFilters(query, user, includeClosed);

            var boardColumns = await query.GroupBy(x => x.TicketStatus)
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
                        RaisedById = y.RaisedById,
                        TicketStatus = _enumTransformer.GetEnumMemberAttributeValue(y.TicketStatus),
                        TicketStatusId = (int)y.TicketStatus
                    })
                }).ToListAsync();

            var requiredBoardColumns = new List<TicketStatuses>()
            {
                TicketStatuses.Raised, TicketStatuses.InProgress, TicketStatuses.Completed
            };

            foreach (var ticketStatus in requiredBoardColumns)
            {
                if (!boardColumns.Any(x => x.Id == (int)ticketStatus))
                    boardColumns.Add(new BoardColumn<TicketListItem>
                    {
                        Id = (int)ticketStatus,
                        Data = new List<TicketListItem>(),
                        Title = _enumTransformer.GetEnumMemberAttributeValue(ticketStatus)
                    });
            }

            return boardColumns.OrderBy(x => x.Id).ToList();
        }

        public async Task<int> Create(CreateTicketDto ticketDto, IUserIdentity raisedBy)
        {
            //TODO: permissions based authorization
            var canAssignOnCreation = raisedBy.UserType == UserTypes.Admin || raisedBy.UserType == UserTypes.Support;

            var newTicket = new Ticket
            {
                RaisedById = raisedBy.UserId,
                AssignedToId = canAssignOnCreation ? ticketDto.AssignedToId : null,
                TicketStatus = TicketStatuses.Raised,
                Description = ticketDto.Description
            };

            _db.Tickets.Add(newTicket);
            await _db.SaveChangesAsync();

            return newTicket.Id;
        }

        public async Task<PostResult> UpdateStatus(UpdateTicketStatus model)
        {
            var ticket = await _db.Tickets.FirstAsync(x => x.Id == model.TicketId);

            ticket.TicketStatus = (TicketStatuses)model.TicketStatusId;

            await _db.SaveChangesAsync();

            return new PostResult();
        }
        
        private IQueryable<Ticket> ApplyCommonTicketFilters(IQueryable<Ticket> query, IUserIdentity user, bool includeClosed)
        {
            if (user.UserType == UserTypes.User)
                query = query.Where(x => x.RaisedById == user.UserId);

            if (!includeClosed)
                query = query.Where(x => x.TicketStatus != TicketStatuses.Completed && x.TicketStatus != TicketStatuses.Cancelled);

            return query;
        }
    }
}
