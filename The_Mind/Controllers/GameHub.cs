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
        Console.WriteLine(Context.ConnectionId + " connected!");
        await Clients.Caller.SendAsync("ReceiveMessage", "Connected to the game!");
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        Console.WriteLine(Context.ConnectionId + " disconnected!");
        _gameService.UnregisterPlayer(Context.ConnectionId);
        Game game = _gameService.GetGame();
        await Clients.All.SendAsync("UpdateGame", game);
        await base.OnDisconnectedAsync(exception);
    }
    
    
    public async Task RegisterPlayer(string name)
    {
        try
        {
            Console.WriteLine("RegisterPlayer called!" + name);
            Player player = _gameService.RegisterPlayer(Context.ConnectionId, name);
            Game game = _gameService.GetGame();
            await Clients.All.SendAsync("UpdateGame", game);
            await Clients.Caller.SendAsync("ReceivePlayerData", player);
            await Clients.Caller.SendAsync("ReceiveMessage", game);
        }
        catch (Exception e)
        {
            await Clients.Caller.SendAsync("ReceiveMessage", e.Message);
        }
    }

    public async Task StartGame(int level)
    {
        Console.WriteLine("StartGame called!");
        if (!_gameService.IsAdmin(Context.ConnectionId))
        {
            await Clients.Caller.SendAsync("ReceiveMessage", "Only the admin can start the game.");
            return;
        }

        Game game = _gameService.DealCards(level);
        await Clients.All.SendAsync("UpdateGame", game);
    }

    public async Task PlayCard(int card)
    {
        Console.WriteLine("Play Card Called");
        var player = _gameService.GetPlayer(Context.ConnectionId);
        if (player == null)
        {
            await Clients.Caller.SendAsync("ReceiveMessage", "You are not registered as a player.");
            return;
        }

        Game result = _gameService.PlayCard(Context.ConnectionId, card);
        await Clients.All.SendAsync("UpdateGame", result);
        await Clients.All.SendAsync("ReceiveMessage", $"{player.Name} played card {card}");
    }

    // Add more methods for game logic here
}