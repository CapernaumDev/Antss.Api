using Antss.Model.Entities;

namespace Antss.Model.ViewModels
{
    public class AppData
    {
        public IEnumerable<Office> Offices { get; set; }
        public IEnumerable<KeyValuePair<int, string>> UserTypes { get; set; }
    }
}
