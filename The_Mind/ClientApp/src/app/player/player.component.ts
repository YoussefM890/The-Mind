import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../models/class/card";
import {Player} from "../models/class/player";


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit{
  @Input() player: Player; // Cards held by the player
  @Input() playerPosition: number // The player's position at the table
  @Input() playerRotation : number
  cardsGap = 1
  cardWidth = 70
  cardHeight = 50
  // Add more inputs as needed, such as player name, profile picture URL, etc.

  constructor() {}
  ngOnInit(): void {
    console.log(this.playerRotation)
  }
  getCardsStyle(){
    return {
      'transform': `rotate(${0}deg)`
    }
  }
  getProfilePictureStyle(){
    return {
      'transform' : `translate(80px,${-(this.cardHeight * this.player.cards.length + this.cardsGap * (this.player.cards.length - 1)) / 2 +25}px)`,
    }
  }
  getPlayerWidth(player: Player): number {
    const cardsLength = player.cards?.length?? 0;
    if (player.compressed) {
      return 50 + (cardsLength - 1) * (50 - 30);
    }
    return 50*cardsLength;
  }
  // You can add methods here for player actions, like playing a card
}

