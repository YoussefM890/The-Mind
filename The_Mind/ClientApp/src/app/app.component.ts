import { Component, OnInit } from '@angular/core';
import {SignalrService} from "./services/signal-r.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public signalRService: SignalrService) { }

  ngOnInit() {
    this.signalRService.startConnection();
  }

  // Other methods to interact with the SignalR service
}
