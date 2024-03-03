export class Card {
  public value: number
  public isFaceUp: boolean = true
  public rotation? : number = 0
  public xOffset? : number = 0
  public yOffset? : number = 0
  public isPlayable? : boolean = true

}

//dummy data
// export const CARDS: Card[] = [
//   new Card(1, true),
//   new Card(2, true),
//   new Card(3, true),
//   new Card(4, true),
//   new Card(5, true),
// ]
