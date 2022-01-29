namespace Antss.Services.Contracts.CommonContracts
{
    public class AppData
    {
        public IEnumerable<OptionItem> Offices { get; set; } = Enumerable.Empty<OptionItem>();
        public IEnumerable<OptionItem> UserTypes { get; set; } = Enumerable.Empty<OptionItem>();
        public IEnumerable<OptionItem> AssignableUsers { get; set; } = Enumerable.Empty<OptionItem>(); 
    }
}
