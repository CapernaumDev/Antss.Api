namespace Antss.Services.Contracts.TicketContracts
{
    public class CreateTicketDto
    {
        public int RaisedById { get; set; }
        public int? AssignedToId { get; set; }
        public string Description { get; set; }
    }
}
