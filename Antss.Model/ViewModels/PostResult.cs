namespace Antss.Model.ViewModels
{
    public class PostResult
    {
        public string ErrorMessage { get; set; }
        public bool IsValid => ErrorMessage == null;
    }
}
