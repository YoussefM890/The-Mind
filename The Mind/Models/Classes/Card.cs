namespace The_Mind.Models;

public class Card
{
    public Card(int value, bool isFaceUp = true, bool isPlayable = true)
    {
        Value = value;
        this.isFaceUp = isFaceUp;
        this.isPlayable = isPlayable;
    }

    public int Value { get; set; }
    public bool isFaceUp { get; set; }
    public bool isPlayable { get; set; }
}