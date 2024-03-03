import {Player} from "./player";
import {Card} from "./card";
import {GameStatus} from "../enum/game-status";
import {Role} from "../enum/role";

export class Game {
  status : GameStatus = GameStatus.Continue
  players : Player[] = []
  playedCards : Card[] = []
}
export const dummyGame : Game = {
  status: GameStatus.Continue,
  players: [
    {
      connectionId: "",
      name: "Player 1",
      role: Role.Player,
      isTurn: true,
      compressed: false,
      cards: [
        { value: 7 , isFaceUp: true,isPlayable: true},
        { value: 3, isFaceUp: true ,isPlayable: true},
        { value: 9, isFaceUp: true ,isPlayable: true},
        { value: 2 , isFaceUp: true,isPlayable: true},
        { value: 5 , isFaceUp: true,isPlayable: true}
      ]
    },
    {
      connectionId: "",
      name: "Player 2",
      role: Role.Player,
      isTurn: false,
      compressed: true,
      cards: [
        { value: 8, isFaceUp: true },
        { value: 6, isFaceUp: true },
        { value: 1, isFaceUp: true },
        { value: 4, isFaceUp: true },
        { value: 9, isFaceUp: true }
      ]
    },
    {
      connectionId: "",
      name: "Player 3",
      role: Role.Player,
      compressed: true,
      isTurn: false,
      cards: [
        { value: 4, isFaceUp: true },
        { value: 8, isFaceUp: true },
        { value: 7, isFaceUp: true },
        { value: 2, isFaceUp: true },
        { value: 1, isFaceUp: true }
      ]
    },
    {
      connectionId: "",
      name: "Player 4",
      role: Role.Player,
      compressed: true,
      isTurn: false,
      cards: [
        { value: 6, isFaceUp: true },
        { value: 1 , isFaceUp: true},
        { value: 10, isFaceUp: true },
        { value: 9 , isFaceUp: true},
        { value: 8 , isFaceUp: true}
      ]
    },
    {
      connectionId: "",
      name: "Player 5",
      role: Role.Player,
      compressed: true,
      isTurn: false,
      cards: [
        { value: 10, isFaceUp: true },
        { value: 7 , isFaceUp: true},
        { value: 5 , isFaceUp: true},
        { value: 4 , isFaceUp: true},
        { value: 8, isFaceUp: true }
      ]
    }
  ],
  playedCards: []
};
