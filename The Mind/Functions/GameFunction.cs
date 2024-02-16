using Microsoft.AspNetCore.SignalR;
using The_Mind.Models;
using The_Mind.Models.Enums;
using The_Mind.Services;

namespace The_Mind.Functions;

public class GameFunction
{
    public static Player CreatePlayer(string connectionId, string name, RoleEnum role = RoleEnum.Player)
    {
        return new Player
        {
            ConnectionId = connectionId,
            Name = name,
            Role = role
        };
    }
}