using The_Mind.Models.Enums;

namespace The_Mind.Models;

public class Player
{
    public string ConnectionId { get; set; }
    public string Name { get; set; }
    public RoleEnum Role { get; set; }
}
