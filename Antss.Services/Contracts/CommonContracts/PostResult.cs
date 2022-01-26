namespace Antss.Services.Contracts.CommonContracts
{
    public class PostResult
    {
        public string? ErrorMessage { get; set; }
        public bool IsValid => ErrorMessage == null;
    }
}
