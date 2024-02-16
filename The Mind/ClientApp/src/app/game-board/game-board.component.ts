import {Component, OnInit} from '@angular/core';
import {Player, PLAYERS} from "../models/class/player";
import {Card, CARDS} from "../models/class/card";
import {GameService} from "../services/game.service";
import {SignalrService} from "../services/signal-r.service";
import {Role} from "../models/enum/role";

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit {
  players: Player[]
  horizontalRadius: number
  verticalRadius: number
  ratio: number = 1/3
  role : Role
  playerName : string = null
  constructor(private gameService: GameService,
              private signalrService : SignalrService
  ) {
    this.verticalRadius = window.innerHeight * this.ratio;
    this.horizontalRadius = window.innerWidth * this.ratio;
  }
  ngOnInit(): void {
    this.gameService.initializeGame(4)
    this.players = this.gameService.getPlayers()
    this.role = this.signalrService.role
    this.playerName = this.signalrService.playerName
  }
  // playCard(card: Card): void {
  //   this.gameService.playCard(card);
  // }
  getPlayerDimensions(playerIndex: number): { width: number, height: number } {
    const cards = this.players[playerIndex].cards.length;
    return {
      width: cards * 50, // 50px per card, for example
      height: 70 // Height is constant, for example
    };
  }

  getPlayerStyle(index: number) {
    const angle = (index / this.players.length) * (2 * Math.PI);
    // Convert angle from radians to degrees for CSS
    const angleDeg = angle * (180 / Math.PI);
    const dimensions = this.getPlayerDimensions(index);
    const x = this.horizontalRadius * Math.cos(angle);
    const y = this.verticalRadius * Math.sin(angle);
    return {
      'transform': `translate(${x}px, ${y}px) rotate(${angleDeg}deg)`,
      'transform-origin': 'center center',
    };
  }

  getPlayerRotation(index: number) {
    return (index / this.players.length) * (2 * Math.PI) * (180 / Math.PI);
  }
  // getActivePlayerIndex() {
  //   return this.gameService.getActivePlayerIndex();
  // }
  getPlayedCards() {
    return this.gameService.getPlayedCards();
  }
  startGame() {
    this.signalrService.startGame()
  }
  get isAdmin() {
    return this.role === Role.Admin
  }

}
