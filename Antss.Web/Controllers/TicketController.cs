using Antss.Services;
using Antss.Services.Contracts.CommonContracts;
using Antss.Services.Contracts.TicketContracts;
using Antss.Web.Authorization;
using Antss.Web.Push;
using Microsoft.AspNetCore.Mvc;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TicketController : ControllerBase
    {
        private readonly TicketService _svc;
        private readonly PushService _pushService;

        public TicketController(TicketService svc, PushService pushService)
        {
            _svc = svc;
            _pushService = pushService;
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
            var ticketId = await _svc.Create(ticketDto, HttpContext.User.Identity.ToUserIdentity());

            _pushService.TicketCreated(ticketId, HttpContext.User.Identity.ToUserIdentity());

            return ticketId;
        }

        [HttpPost, Route("UpdateStatus")]
        public async Task<PostResult> UpdateStatus(UpdateTicketStatus model)
        {
            var result = await _svc.UpdateStatus(model);

            _pushService.TicketStatusUpdated(model.TicketId, model.BoardColumnIndex, HttpContext.User.Identity.ToUserIdentity());

            return result;
        }
    }
}
