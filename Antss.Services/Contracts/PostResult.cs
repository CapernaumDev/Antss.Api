namespace Antss.Services.Contracts
{
    public class PostResult
    {
        public string? ErrorMessage { get; set; }
        public bool IsValid => ErrorMessage == null;
    }
}
