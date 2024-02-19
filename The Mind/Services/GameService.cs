using The_Mind.Functions;
using The_Mind.Models;
using The_Mind.Models.Enums;

namespace The_Mind.Services;

public class GameService
{
    private List<Card> deck = Enumerable.Range(1, 100).Select(v => new Card(v)).ToList();

    private bool isAdminPresent = false;
    private List<Card> playedCards = new List<Card>();
    private Dictionary<string, List<Card>> playerHands = new Dictionary<string, List<Card>>();
    private List<Player> players = new List<Player>();

    public List<Player> GetAllPlayers()
    {
        return players;
    }

    public Player GetPlayer(string connectionId)
    {
        return players.FirstOrDefault(p => p.ConnectionId == connectionId);
    }

    public bool IsAdmin(string connectionId)
    {
        return players.Any(p => p.ConnectionId == connectionId && p.Role == Role.Admin);
    }

    public Player RegisterPlayer(string connectionId, string name)
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
            Player player = GameFunction.CreatePlayer(connectionId, name, Role.Admin);
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
            if (player.Role == Role.Admin)
            {
                isAdminPresent = false;
            }

            players.Remove(player);
        }
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

    public Game DealCards(int round = 1)
    {
        playedCards.Clear();
        ShuffleDeck();
        int cardsToDeal = round;

        for (int i = 0; i < players.Count; i++)
        {
            var hand = deck.Take(cardsToDeal).ToList();
            deck.RemoveRange(0, cardsToDeal);
            players[i].cards = hand;
            players[i].IsTurn = i == 0; // First player's turn is set to true
        }

        return new Game
        {
            Status = GameStatus.Continue,
            Players = players,
            PlayedCards = playedCards
        };
    }


    public Game PlayCard(string connectionId, int cardValue)
    {
        var player = players.FirstOrDefault(p => p.ConnectionId == connectionId);
        Console.WriteLine(cardValue);
        Console.WriteLine(string.Join(", ", player.cards.Select(card => $"Card Value: {card.Value}")));
        Console.WriteLine(string.Join(", ", players.Select(player => $"Player: {player.Name}")));
        if (player != null && player.cards.Any(c => c.Value == cardValue))
        {
            var card = player.cards.First(c => c.Value == cardValue);
            player.cards.Remove(card);
            playedCards.Add(card);
            UpdateTurns(player);
            var status = GetGameStatus(card);
            // Return updated game state
            return new Game
            {
                Status = status,
                Players = players,
                PlayedCards = playedCards
            };
        }

        return null;
    }

    private void UpdateTurns(Player player)
    {
        var currentPlayerIndex = players.IndexOf(player);
        player.IsTurn = false;
        int nextPlayerIndex = (currentPlayerIndex + 1) % players.Count;
        players[nextPlayerIndex].IsTurn = true;
    }

    private GameStatus GetGameStatus(Card card)
    {
        if (players.Any(p => p.cards.Any(c => c.Value < card.Value)))
        {
            Console.WriteLine("Lost");
            return GameStatus.Lost;
        }

        if (players.All(p => !p.cards.Any()))
        {
            Console.WriteLine("Won");
            return GameStatus.Won;
        }

        return GameStatus.Continue;
    }
}