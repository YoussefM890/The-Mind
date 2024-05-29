import {Component, OnInit} from '@angular/core';
import {Player} from "../models/class/player";
import {GameService} from "../services/game.service";
import {SignalrService} from "../services/signal-r.service";
import {Role} from "../models/enum/role";
import {GameStatus} from "../models/enum/game-status";
import {dummyGame, Game} from "../models/class/game";
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.scss']
})
export class GameBoardComponent implements OnInit {
  // game : Game  = dummyGame//Todo : remove this line after testing
  game : Game
  horizontalRadius: number
  verticalRadius: number
  ratio: number = 1/2.5
  currentPlayer :Player = dummyGame.players[0]
  level = 1
  GameStatus = GameStatus
  constructor(private gameService: GameService,
              private signalrService : SignalrService
  ) {
    this.verticalRadius = window.innerHeight * this.ratio;
    this.horizontalRadius = window.innerWidth * this.ratio;
  }
  ngOnInit(): void {
    // this.gameService.initializeGame(4)
    // this.players = this.gameService.getPlayers()
    // Todo : uncomment the next two line after testing
    this.currentPlayer = this.signalrService.currentPlayer
    this.setupListeners()
  }
  setupListeners() {
    this.setupPlayersListener()
    this.setupPlayedCardsListener()
  }
  setupPlayersListener() {
    this.signalrService.game$.subscribe(game => {
      this.game = game
    })
  }
  setupPlayedCardsListener() {
    this.signalrService.game$.subscribe(game => {
      this.game.playedCards = game.playedCards;
      this.currentPlayer = this.signalrService.currentPlayer
    })
  }

  getPlayerStyle(index: number) {
    const angle = ((index / this.game.players.length) * (2 * Math.PI)) + (Math.PI / 2);
    const angleDeg = angle * (180 / Math.PI);
    const radius = Math.min(this.horizontalRadius, this.verticalRadius) + 30;
    // const dimensions = this.getPlayerDimensions(index);
    const x = this.horizontalRadius * Math.cos(angle);
    const y = this.verticalRadius * Math.sin(angle);
    return {
      'transform': `translate(${x}px, ${y}px) rotate(${angleDeg}deg)`,
      'transform-origin': 'center center',
    };
  }

  getPlayerRotation(index: number) {
    const angle = ((index / this.game.players.length) * (2 * Math.PI)) + (Math.PI / 2);
    return angle * (180 / Math.PI);
  }
  // getActivePlayerIndex() {
  //   return this.gameService.getActivePlayerIndex();
  // }
  startGame() {
    this.signalrService.startGame(this.level)
  }
  get isAdmin() {
    return this.currentPlayer.role === Role.Admin
  }
  trackById(index: number, player: Player): any {
    return player.connectionId; // Assuming each player has a unique 'id' property
  }

}
