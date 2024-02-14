import { Component, Input } from '@angular/core';
import {Card} from "../models/class/card";
import {GameService} from "../services/game.service";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() card: Card; // The card to display

  constructor(private gameService : GameService) { }

  playCard(card : Card): void {
    this.gameService.playCard(card);
  }

  // Add any methods required for card interactions here
}
