import { Component, Input } from '@angular/core';
import {Card} from "../models/class/card";


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  @Input() cards: Card[] // Cards held by the player
  @Input() playerPosition: number // The player's position at the table
  @Input() playerRotation : number
  cardsGap = 10
  cardWidth = 70
  cardHeight = 50
  // Add more inputs as needed, such as player name, profile picture URL, etc.

  constructor() { }
  getCardsStyle(){
    return {
      'transform': `rotate(${0}deg)`
    }
  }
  getProfilePictureStyle(){
    return {
      'transform' : `translate(80px,${-(this.cardHeight * this.cards.length + this.cardsGap * (this.cards.length - 1)) / 2 +25}px)`,
    }
  }
  // You can add methods here for player actions, like playing a card
}

