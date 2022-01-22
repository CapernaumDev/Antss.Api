using System.Runtime.Serialization;

namespace Antss.Model
{
    public enum TicketStatuses
    {
        Raised = 1,

        [EnumMember(Value = "In Progress")]
        InProgress,
        Completed,
        Cancelled
    }
}
