import {Component, Input, OnInit} from '@angular/core';
import {Card} from "../models/class/card";

@Component({
  selector: 'app-played-cards',
  templateUrl: './played-cards.component.html',
  styleUrls: ['./played-cards.component.scss']
})
export class PlayedCardsComponent implements OnInit {
  @Input() playedCards: Card[];


  ngOnInit() {
    this.getRandomStyles();

  }

  private getRandomStyles() {
    this.playedCards.forEach(card => {
      card.rotation = Math.random() * 180; // Random rotation
      card.xOffset = Math.random() * 100 - 35; // Random X offset
      card.yOffset = Math.random() * 100 - 25; // Random Y offset
    });
  }
  public getCardStyles(card: Card) {
    return {
      transform: `rotate(${card.rotation}deg) translate(${card.xOffset}px, ${card.yOffset}px)`
    };
  }
}
