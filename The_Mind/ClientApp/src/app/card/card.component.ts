import { Component, Input } from '@angular/core';
import {Card} from "../models/class/card";
import {GameService} from "../services/game.service";
import {SignalrService} from "../services/signal-r.service";


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Input() card: Card; // The card to display

  constructor(private signalRService : SignalrService) { }

  playCard(card : Card): void {
    this.signalRService.playCard(card);
  }

  // Add any methods required for card interactions here
}
