using The_Mind.Functions;
using The_Mind.Models;
using The_Mind.Models.Enums;

namespace The_Mind.Services;

public class GameService
{
    private List<Player> players = new List<Player>();
    private List<Card> deck = Enumerable.Range(1, 100).Select(v => new Card(v)).ToList();
    private Dictionary<string, List<Card>> playerHands = new Dictionary<string, List<Card>>();
    private bool isAdminPresent = false;

    public List<Player> GetAllPlayers()
    {
        return players;
    }
    public bool IsAdmin(string connectionId)
    {
        return players.Any(p => p.ConnectionId == connectionId && p.Role == RoleEnum.Admin);
    }
    public  Player RegisterPlayer(string connectionId,string name)
    {
        if (players.Any(p => p.ConnectionId == connectionId))
        {
            Player player = players.First(p => p.ConnectionId == connectionId);
            player.Name = name;
            return player;
        }
        if (isAdminPresent)
        {
            Player player = GameFunction.CreatePlayer(connectionId, name);
            players.Add(player);
            return player;
        }
        if (name.Equals("Youssef", StringComparison.OrdinalIgnoreCase))
        {
            isAdminPresent = true;
            Player player  = GameFunction.CreatePlayer(connectionId, name, RoleEnum.Admin);
            players.Add(player);
            return player;
        }
        throw new Exception("No admin present!");
    }
    public void UnregisterPlayer(string connectionId)
    {
        if (players.Any(p => p.ConnectionId == connectionId))
        {
            Player player = players.First(p => p.ConnectionId == connectionId);
            if (player.Role == RoleEnum.Admin)
            {
                isAdminPresent = false;
            }
            players.Remove(player);
        }
    }
    
    
    public string GetPlayers()
    {
        return string.Join(", ", players.Select(p => p.Name));
    }
    
    public void ShuffleDeck()
    {
        Random rng = new Random();
        int n = deck.Count;
        while (n > 1)
        {
            n--;
            int k = rng.Next(n + 1);
            (deck[k], deck[n]) = (deck[n], deck[k]);
        }
    }
    public List<Card> DealCards(string connectionId, int round)
    {
        int cardsToDeal = round; // For simplicity, deal cards based on the round number
        if (!playerHands.ContainsKey(connectionId))
        {
            playerHands.Add(connectionId, new List<Card>());
        }

        var hand = deck.Take(cardsToDeal).ToList();
        deck.RemoveRange(0, cardsToDeal);
        playerHands[connectionId].AddRange(hand);
        return hand;
    }
}