using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using System.Collections.Generic;

public class GameHub : Hub
{
    private static List<string> playerNames = new List<string>();

    public override async Task OnConnectedAsync()
    {
        await Clients.Caller.SendAsync("ReceiveMessage", "Connected to the game!");
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        // You can add logic here to handle player disconnection if needed
        await base.OnDisconnectedAsync(exception);
    }

    public async Task RegisterPlayer(string name)
    {
        if (!playerNames.Contains(name))
        {
            playerNames.Add(name);
            await Clients.All.SendAsync("PlayerJoined", name);
        }
        else
        {
            await Clients.Caller.SendAsync("ReceiveMessage", "This name is already taken!");
        }
    }

    // Add more methods for game logic here
}