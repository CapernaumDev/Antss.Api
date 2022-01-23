using System.Reflection;
using System.Runtime.Serialization;

namespace Antss.Model.Enums
{
    public class EnumTransformer
    {
        public IEnumerable<KeyValuePair<int, string>> ToFormattedCollection<T>() where T : Enum
        {
            var result = new List<KeyValuePair<int, string>>();
            foreach (var enumValue in Enum.GetValues(typeof(T)).Cast<int>())
            {
                result.Add(new KeyValuePair<int, string>(enumValue, GetEnumMemberAttributeValue((T)(object)enumValue)));
            }

            return result;
        }

        private static string GetEnumMemberAttributeValue(Enum value)
        {
            return
                value
                    .GetType()
                    .GetMember(value.ToString())
                    .FirstOrDefault()
                    ?.GetCustomAttribute<EnumMemberAttribute>()
                    ?.Value
                ?? value.ToString();
        }
    }
}
