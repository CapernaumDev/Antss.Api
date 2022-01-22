using System.ComponentModel.DataAnnotations;

namespace Antss.Model
{
    public enum TicketStatuses
    {
        Raised = 1,

        [Display(Name = "In Progress")]
        InProgress,
        
        Completed,
        Cancelled
    }
}
