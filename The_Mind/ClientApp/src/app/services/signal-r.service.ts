import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Router} from "@angular/router";
import {Player} from "../models/class/player";
import {BehaviorSubject} from "rxjs";
import {Game} from "../models/class/game";
import {Card} from "../models/class/card";
import {environment} from "../../environments/environment";
import {GameStatus} from "../models/enum/game-status";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  private _currentPlayerId: string
  private gameSubject = new BehaviorSubject<Game>(new Game())
  public game$ = this.gameSubject.asObservable();
  private readonly baseUrl = `${window.location.protocol}//${window.location.host}`;
  constructor(private router: Router) {
    //if this baseurl contains localhost : change the port to 5001
    if(this.baseUrl.includes('localhost')){
      this.baseUrl = this.baseUrl.replace('4200','5001');
      this.baseUrl = this.baseUrl.replace('http','https');
    }
  }

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      // .withUrl(environment.hubUrl) // Use the environment-specific URL
      .withUrl(this.baseUrl+'/gameHub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
          console.log('Connection started')
          // this.addPlayerJoinedListener()
          this.receiveMessageListener()
          this.receivePlayerDataListener()
          // this.receiveCardsListener()
          this.updateGameListener()
        }
      )
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public registerPlayer = (playerName: string) =>
    this.hubConnection.invoke('RegisterPlayer', playerName)

  public startGame = (level = 1) =>
    this.hubConnection.invoke('StartGame', level)

  public playCard = (card: Card) =>
    this.hubConnection.invoke('PlayCard', card.value)


  // public addPlayerJoinedListener = () => {
  //   this.hubConnection.on('PlayerJoined', (players: Player[]) => {
  //     //sort players so that the current player is always first
  //     console.log("player joined")
  //     const game = this.gameSubject.value
  //     game.players = players
  //     this.gameSubject.next(game)
  //   });
  // }
  public receiveMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log(message);
    });
  }
  public receivePlayerDataListener = () => {
    this.hubConnection.on('ReceivePlayerData', (player: Player) => {
      this._currentPlayerId = player.connectionId
      let players = this.gameSubject.value.players
      players.sort((a, b) => a.connectionId === this._currentPlayerId ? -1 : 1)
      this.gameSubject.next(this.gameSubject.value)
      this.router.navigate(['/board']);
    });
  }
  // public receiveCardsListener = () => {
  //   this.hubConnection.on('ReceiveCards', (players: Player[]) => {
  //     console.log("cards received",players)
  //     this.updatePlayers(players)
  //   });
  // }
  public updateGameListener(){
    this.hubConnection.on('UpdateGame', (game: Game) => {
      game.players.sort((a, b) => a.connectionId === this._currentPlayerId ? -1 : 1)
      this.updateGame(game)
    })
  }
  updateGame(game:Game){
    if (game.status === GameStatus.Continue) {
      this.updatePlayers(game.players)
      this.updatePlayedCards(game.playedCards)
    }
    else {
      this.updateCardsEndGame(game)
    }
    this.gameSubject.next(game)
  }
  private updatePlayers(players: Player[]) {
    //sort players so that the current player is always first
    players.sort((a, b) => a.connectionId === this._currentPlayerId ? -1 : 1)
    players.forEach(player => {
      if (player.connectionId !== this._currentPlayerId) {
        player.compressed = true;
      }
      let i = 0;
      player.cards.forEach(card => {
        i+=1
        if (player.connectionId === this._currentPlayerId) {
          card.isPlayable = i === 1;
          card.isFaceUp = true;
        } else {
          card.isPlayable = false;
          card.isFaceUp = false;
        }
      });
    });
  }
  private updatePlayedCards(cards: Card[]) {
    cards.forEach(card => {
        card.isFaceUp = true;
        card.isPlayable = false
      });
  }
  updateCardsEndGame(game : Game) {
    game.players.forEach(player => {
      player.cards.forEach(card => {
        card.isFaceUp = true;
        card.isPlayable = false;
      });
    })
    game.playedCards.forEach(card => {
      card.isFaceUp = true;
      card.isPlayable = false
    });
  }
  get currentPlayer() : Player{
    return this.gameSubject.value.players.find(p => p.connectionId === this._currentPlayerId)
  }
}
