using The_Mind.Models;
using The_Mind.Models.Enums;

namespace The_Mind.Functions;

public class GameFunctions
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

    public static List<Card> InitDeck(int start = 1, int end = 100)
    {
        return Enumerable.Range(start, end).Select(v => new Card(v)).ToList();
    }

    public static List<Card> ShuffleDeck(List<Card> deck)
    {
        Random rng = new Random();
        int n = deck.Count;
        while (n > 1)
        {
            n--;
            int k = rng.Next(n + 1);
            (deck[k], deck[n]) = (deck[n], deck[k]);
        }

        return deck;
    }

    public static GameStatus GetGameStatus(Card card, List<Player> players)
    {
        if (players.Any(p => p.cards.Any(c => c.Value < card.Value)))
        {
            Console.WriteLine("Lost");
            return GameStatus.Lost;
        }

        if (players.Count(p => p.cards.Any()) == 1)
        {
            Console.WriteLine("Won");
            return GameStatus.Won;
        }

        return GameStatus.Continue;
    }
}