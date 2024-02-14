import {Card} from "./card";

export class Player {
  constructor(
    public name: string, // The player's name
    public cards: Card[], // The player's cards
  ) {}
}

//dummy data
export const PLAYERS: Player[] = [
  new Player("Player 1", [
    // new Card(1, true),
    // new Card(2, true),
    // new Card(3, true),
    // new Card(4, true),
    // new Card(5, true),
  ]),
  new Player("Player 2", [
    // new Card(1, true),
    // new Card(2, true),
    // new Card(3, true),
    // new Card(4, true),
    // new Card(5, true),
  ]),
  new Player("Player 3", [
    // new Card(1, true),
    // new Card(2, true),
    // new Card(3, true),
    // new Card(4, true),
    // new Card(5, true),
  ]),
  new Player("Player 4", [
    // new Card(1, true),
    // new Card(2, true),
    // new Card(3, true),
    // new Card(4, true),
    // new Card(5, true),
  ]),
  new Player("Player 1", [
    // new Card(1, true),
    // new Card(2, true),
    // new Card(3, true),
    // new Card(4, true),
    // new Card(5, true),
  ]),
  new Player("Player 2", [
    // new Card(1, true),
    // new Card(2, true),
    // new Card(3, true),
    // new Card(4, true),
    // new Card(5, true),
  ]),
  new Player("Player 3", [
    // new Card(1, true),
    // new Card(2, true),
    // new Card(3, true),
    // new Card(4, true),
    // new Card(5, true),
  ]),
  new Player("Player 4", [
    // new Card(1, true),
    // new Card(2, true),
    // new Card(3, true),
    // new Card(4, true),
    // new Card(5, true),
  ]),
];
