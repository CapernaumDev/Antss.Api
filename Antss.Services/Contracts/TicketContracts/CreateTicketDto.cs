namespace Antss.Services.Contracts.TicketContracts
{
    public class CreateTicketDto
    {
        public int? AssignedToId { get; set; }
        public string Description { get; set; }
    }
}
