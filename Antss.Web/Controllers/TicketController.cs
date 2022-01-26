using Antss.Services;
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
        public async Task<ActionResult<IEnumerable<TicketListItem>>> Get()
        {
            return await _svc.GetList();
        }

        [HttpPost, Route("Create")]
        public async Task<int> Create(CreateTicketDto ticketDto)
        {
            return await _svc.Create(ticketDto);
        }
    }
}
