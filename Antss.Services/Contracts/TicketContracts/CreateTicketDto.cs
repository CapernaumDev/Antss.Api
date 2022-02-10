namespace Antss.Services.Contracts.TicketContracts
{
    public class CreateTicketDto
    {
        public int? AssignedToId { get; set; }
        public string Description { get; set; }
        public string Title { get; set; }
    }
}
