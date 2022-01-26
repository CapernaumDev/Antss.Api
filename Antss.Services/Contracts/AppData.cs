using Antss.Model.Entities;

namespace Antss.Services.Contracts
{
    public class AppData
    {
        public IEnumerable<Office>? Offices { get; set; }
        public IEnumerable<OptionItem>? UserTypes { get; set; }
    }
}
