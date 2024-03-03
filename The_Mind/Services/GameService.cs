using The_Mind.Functions;
using The_Mind.Models;
using The_Mind.Models.Enums;

namespace The_Mind.Services;

public class GameService
{
    private List<Card> deck;

    private bool isAdminPresent = false;
    private List<Card> playedCards = new List<Card>();
    private Dictionary<string, List<Card>> playerHands = new Dictionary<string, List<Card>>();
    private List<Player> players = new List<Player>();

    public Player GetPlayer(string connectionId)
    {
        return players.FirstOrDefault(p => p.ConnectionId == connectionId);
    }

    public Game GetGame()
    {
        return new Game
        {
            Status = GameStatus.Continue,
            Players = players,
            PlayedCards = playedCards
        };
    }

    public bool IsAdmin(string connectionId)
    {
        return players.Any(p => p.ConnectionId == connectionId && p.Role == Role.Admin);
    }

    public Player RegisterPlayer(string connectionId, string name)
    {
        Player player;
        if (players.Any(p => p.ConnectionId == connectionId))
        {
            player = players.First(p => p.ConnectionId == connectionId);
            player.Name = name;
            Console.WriteLine("player exists" + string.Join(", ", players.Select(p => p.Name)));
            return player;
        }

        if (isAdminPresent)
        {
            player = GameFunctions.CreatePlayer(connectionId, name);
            players.Add(player);
            Console.WriteLine("player is not admin"+ string.Join(", ", players.Select(p => p.Name)));
            return player;
        }
        player = GameFunctions.CreatePlayer(connectionId, name, Role.Admin);
        players.Add(player);
        isAdminPresent = true;
        //join player
        Console.WriteLine("player is new admin"+string.Join(", ", players.Select(p => p.Name)));
        return player;
    }

    public void UnregisterPlayer(string connectionId)
    {
        if (players.Any(p => p.ConnectionId == connectionId))
        {
            Player player = players.First(p => p.ConnectionId == connectionId);
            players.Remove(player);
            if (player.Role == Role.Admin)
            {
                if (players.Count > 0)
                {
                    players[1].Role = Role.Admin;
                }
                else
                {
                    isAdminPresent = false;
                }
            }
        }
    }

    public Game DealCards(int round = 1)
    {
        deck = GameFunctions.InitDeck();
        deck = GameFunctions.ShuffleDeck(deck);
        playedCards.Clear();
        int cardsToDeal = round;
        for (int i = 0; i < players.Count; i++)
        {
            var hand = deck.Take(cardsToDeal).ToList();
            deck.RemoveRange(0, cardsToDeal);
            hand.Sort((card1, card2) => card1.Value.CompareTo(card2.Value)); // Sort the hand by card value
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
        if (player != null && player.cards.Any(c => c.Value == cardValue))
        {
            var card = player.cards.First(c => c.Value == cardValue);
            player.cards.Remove(card);
            playedCards.Add(card);
            // UpdateTurns(player);
            var status = GameFunctions.GetGameStatus(card, players);
            return new Game
            {
                Status = status,
                Players = players,
                PlayedCards = playedCards
            };
        }

        return null;
    }

    // private void UpdateTurns(Player player)
    // {
    //     var currentPlayerIndex = players.IndexOf(player);
    //     player.IsTurn = false;
    //     int nextPlayerIndex = (currentPlayerIndex + 1) % players.Count;
    //     players[nextPlayerIndex].IsTurn = true;
    // }
}