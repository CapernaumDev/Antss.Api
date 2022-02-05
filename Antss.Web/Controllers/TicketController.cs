using Antss.Services;
using Antss.Services.Contracts.CommonContracts;
using Antss.Services.Contracts.TicketContracts;
using Antss.Web.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TicketController : ControllerBase
    {
        private readonly TicketService _svc;

        public TicketController(TicketService svc)
        {
            _svc = svc;
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
            return await _svc.Create(ticketDto, HttpContext.User.Identity.ToUserIdentity());
        }

        [HttpPost, Route("UpdateStatus")]
        public async Task<PostResult> UpdateStatus(UpdateTicketStatus model)
        {
            return await _svc.UpdateStatus(model);
        }
    }
}
