using Microsoft.AspNetCore.SignalR;
using The_Mind.Models;
using The_Mind.Services;

namespace The_Mind.Controllers;

public class GameHub : Hub
{
    private readonly GameService _gameService;

    public GameHub(GameService gameService)
    {
        _gameService = gameService;
    }

    public override async Task OnConnectedAsync()
    {
        await Clients.Caller.SendAsync("ReceiveMessage", "Connected to the game!");
        await base.OnConnectedAsync();
    }


    public async Task RegisterPlayer(string name)
    {
        try
        {
            Player player = _gameService.RegisterPlayer(Context.ConnectionId,name);
            await Clients.Caller.SendAsync("ReceiveRole", player.Role);
            await Clients.Caller.SendAsync("PlayerJoined", name);
            await Clients.All.SendAsync("ReceiveMessage", "players list" + _gameService.GetPlayers());
        }
        catch (Exception e)
        {
            await Clients.Caller.SendAsync("ReceiveMessage", e.Message);
        }
    }
    public override async Task OnDisconnectedAsync(Exception exception)
    {
        _gameService.UnregisterPlayer(Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }
    public async Task StartGame()
    {
        Console.WriteLine("StartGame called!");
        if (!_gameService.IsAdmin(Context.ConnectionId))
        {
            await Clients.Caller.SendAsync("ReceiveMessage", "Only the admin can start the game.");
            return;
        }

        var round = 1;
        foreach (var player in _gameService.GetAllPlayers())
        {
            var hand = _gameService.DealCards(player.ConnectionId, round);
            await Clients.Client(player.ConnectionId).SendAsync("ReceiveCards", hand.Select(card => card.Value));
        }
    }

    // Add more methods for game logic here
}