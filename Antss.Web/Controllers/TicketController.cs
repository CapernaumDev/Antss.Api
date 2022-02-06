using Antss.Model;
using Antss.Services;
using Antss.Services.Contracts.CommonContracts;
using Antss.Services.Contracts.TicketContracts;
using Antss.Web.Authorization;
using Antss.Web.Hubs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TicketController : ControllerBase
    {
        private readonly TicketService _svc;
        private readonly IHubContext<MainHub> _hub;

        public TicketController(TicketService svc, IHubContext<MainHub> hub)
        {
            _svc = svc;
            _hub = hub;
        }

        [HttpGet, Route("List")]
        public async Task<ActionResult<IEnumerable<TicketListItem>>> Get(bool includeClosed)
        {
            return await _svc.GetList(HttpContext.User.Identity.ToUserIdentity(), includeClosed);
        }

        [HttpGet, Route("Board")]
        public async Task<ActionResult<IEnumerable<BoardColumn<TicketListItem>>>> Board(bool includeClosed)
        {
            return await _svc.GetBoard(HttpContext.User.Identity.ToUserIdentity(), includeClosed);
        }

        [HttpPost, Route("Create")]
        public async Task<int> Create(CreateTicketDto ticketDto)
        {
            var ticket = await _svc.Create(ticketDto, HttpContext.User.Identity.ToUserIdentity());

            await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
                .SendAsync("ticketCreated", ticket);

            //todo: also send back to user who created the ticket (need to associate connections with users)

            return ticket.Id;
        }

        [HttpPost, Route("UpdateStatus")]
        public async Task<PostResult> UpdateStatus(UpdateTicketStatus model)
        {
            var result = await _svc.UpdateStatus(model);

            await _hub.Clients.Groups(UserTypes.Admin.ToString(), UserTypes.Support.ToString())
                .SendAsync("ticketStatusUpdated", result.TicketListItem);

            //todo: also send back to user who created the ticket (need to associate connections with users)

            return result.PostResult;
        }
    }
}
