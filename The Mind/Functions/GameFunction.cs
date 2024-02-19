using The_Mind.Models;
using The_Mind.Models.Enums;

namespace The_Mind.Functions;

public class GameFunction
{
    public static Player CreatePlayer(string connectionId, string name, Role role = Role.Player)
    {
        return new Player
        {
            ConnectionId = connectionId,
            Name = name,
            Role = role,
            cards = new List<Card>()
        };
    }
}