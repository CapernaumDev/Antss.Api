namespace Antss.Services.Contracts.CommonContracts
{
    public class BoardColumn<T> where T : class
    {
        public string Title { get; set; }
        public int Id { get; set; }
        public IEnumerable<T> Data { get; set; }
    }
}
