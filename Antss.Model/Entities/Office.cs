namespace Antss.Model
{
    public class Office
    {
        public int Id { get; set; }        
        public string Name { get; set; }
        public IEnumerable<User> Users { get; set; }
    }
}