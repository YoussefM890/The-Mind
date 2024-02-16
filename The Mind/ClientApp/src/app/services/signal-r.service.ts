import {Injectable} from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Router} from "@angular/router";
import {Role} from "../models/enum/role";

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection;
  private _role : Role  = Role.Player
  private _playerName : string
  constructor(private router : Router) {
  }
  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:7290/gameHub')
      .build();

    this.hubConnection
      .start()
      .then(() => {
        console.log('Connection started')
        this.addPlayerJoinedListener()
        this.receiveMessageListener()
        this.receiveRoleListener()
        this.receiveCardsListener()
        }
        )
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public registerPlayer = (playerName: string) =>
    this.hubConnection.invoke('RegisterPlayer', playerName)

  public startGame = () =>
    this.hubConnection.invoke('StartGame')

  public addPlayerJoinedListener = () => {
    this.hubConnection.on('PlayerJoined', (name: string) => {
      this._playerName = name
      console.log(`${name} has joined the game.`);
      this.router.navigate(['/board']);
    });
  }
  public receiveMessageListener = () => {
    this.hubConnection.on('ReceiveMessage', (message: string) => {
      console.log(message);
    });
  }
  public receiveRoleListener = () => {
    this.hubConnection.on('ReceiveRole', (role: Role) => {
      this._role = role
    });
  }
  public receiveCardsListener = () => {
    this.hubConnection.on('ReceiveCards', (cards: number[]) => {
      console.log(cards)
    });
  }

  get role() {
    return this._role
  }
  get playerName(){
    return this._playerName
  }
}
