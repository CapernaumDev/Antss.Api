using System.Text.Json.Serialization;

namespace Antss.Model
{
    public class User
    {
        public int Id { get; set; }        
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public UserTypes UserType { get; set; }
        public string Location { get; set; }
        public string ContactNumber { get; set; }
        public string EmailAddress { get; set; }
    }
}