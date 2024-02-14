import { Injectable } from '@angular/core';
import {Player} from "../models/class/player";
import {Card} from "../models/class/card";

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private deck: Card[] = [];
  private players: Player[] = [];
  private currentLevel: number = 1;
  private lives: number = 3;
  // private activePlayerIndex: number = 0;
  private playedCards: Card[] = [];

  constructor() {}

  initializeGame(playerCount: number): void {
    this.currentLevel = 1;
    this.lives = 3;
    this.deck = this.createDeck();
    this.players = this.createPlayers(playerCount);
    this.dealCards();
  }

  private createDeck(): Card[] {
    return Array.from({ length: 100 }, (_, i) => new Card(i + 1, true));
  }

  private shuffleDeck(): void {
    // Shuffle the deck
    for (let i = this.deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  }

  private createPlayers(playerCount: number): Player[] {
    return Array.from({ length: playerCount }, (_, i) => new Player(`Player ${i + 1}`, []));
  }

  private dealCards(): void {
    //assign the player index to the card and give each player 4 cards
    this.deck.forEach((card, index) => {
      card.playerIndex = index % this.players.length;
      if (index < this.players.length * 4) {
        this.players[card.playerIndex].cards.push(card);
      }
    });
  }
  playCard(card: Card): void {
    //remove card from player's hand
    const player = this.players[card.playerIndex];
    //remove the card from the player's hand
    const cardIndex = player.cards.indexOf(card);
    player.cards.splice(cardIndex, 1);
    //update the card's state
    card.isFaceUp = true;
    card.isPlayable = false;
    card.rotation = Math.random() * 180; // Random rotation
    card.xOffset = Math.random() * 100 - 35; // Random X offset
    card.yOffset = Math.random() * 100 - 25; // Random Y offset
    //place card on the table
    this.playedCards.push(card);
  }
  getPlayers(): Player[] {
    return this.players;
  }
  getPlayedCards(): Card[] {
    return this.playedCards;
  }
  // getActivePlayerIndex(): number {
  //   return this.activePlayerIndex;
  // }

  // Additional methods for game progression, playing a card, etc.
}
