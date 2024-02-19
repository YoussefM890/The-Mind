using The_Mind.Models.Enums;

namespace The_Mind.Models;

public class Player
{
    public string ConnectionId { get; set; }
    public string Name { get; set; }
    public Role Role { get; set; }
    public bool IsTurn { get; set; } = false;
    public List<Card> cards { get; set; }
}