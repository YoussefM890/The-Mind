using The_Mind.Models.Enums;

namespace The_Mind.Models;

public class Game
{
    public GameStatus Status { get; set; }
    public List<Player> Players { get; set; }
    public List<Card> PlayedCards { get; set; }
}