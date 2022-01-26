using Newtonsoft.Json;

namespace Antss.Data.EntityMappings
{
    [JsonObject(MemberSerialization = MemberSerialization.OptIn)]
    public abstract class EntityBase
    {
    }
}
