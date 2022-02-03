using Antss.Model.Entities;
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
            //TODO: stop repeating this in each action
            var user = (User)HttpContext.Items["User"];
            
            return await _svc.GetList(user, includeClosed);
        }

        [HttpGet, Route("Board")]
        public async Task<ActionResult<IEnumerable<BoardColumn<TicketListItem>>>> Board(bool includeClosed)
        {
            var user = (User)HttpContext.Items["User"];

            return await _svc.GetBoard(user, includeClosed);
        }

        [HttpPost, Route("Create")]
        public async Task<int> Create(CreateTicketDto ticketDto)
        {
            var user = (User)HttpContext.Items["User"];

            return await _svc.Create(ticketDto, user);
        }

        [HttpPost, Route("UpdateStatus")]
        public async Task<PostResult> UpdateStatus(UpdateTicketStatus model)
        {
            return await _svc.UpdateStatus(model);
        }
    }
}
