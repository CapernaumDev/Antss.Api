using Antss.Data;
using Antss.Model.Entities;
using Antss.Web.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Antss.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TicketController : ControllerBase
    {
        private readonly AntssContext _db;

        public TicketController(AntssContext db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("List")]
        public async Task<ActionResult<IEnumerable<Ticket>>> Get()
        {
            return await _db.Tickets.AsNoTracking().Include(x => x.RaisedBy).Include(x => x.AssignedTo).ToListAsync();
        }
    }
}
