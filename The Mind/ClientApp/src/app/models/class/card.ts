export class Card {
  constructor(
    public value: number, // The value of the card, from 1 to 100
    public isFaceUp: boolean,
    public playerIndex : number = 0,
    public rotation : number = 0,
    public xOffset : number = 0,
    public yOffset : number = 0,
    public isPlayable : boolean = true,
  ) {}
}

//dummy data
export const CARDS: Card[] = [
  new Card(1, true),
  new Card(2, true),
  new Card(3, true),
  new Card(4, true),
  new Card(5, true),
]
