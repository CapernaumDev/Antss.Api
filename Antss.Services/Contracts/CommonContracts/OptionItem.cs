namespace Antss.Services.Contracts.CommonContracts
{
    public class OptionItem
    {
        public OptionItem(int value, string label)
        {
            Value = value;
            Label = label;
        }

        public int Value { get; set; }
        public string Label { get; set; }
    }
}
