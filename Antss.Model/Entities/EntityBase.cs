using Newtonsoft.Json;

namespace Antss.Model.Entities
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public abstract class EntityBase
    {
    }
}
