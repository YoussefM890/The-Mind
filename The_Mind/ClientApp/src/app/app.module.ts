import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PlayerComponent } from './player/player.component';
import { CardComponent } from './card/card.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { PlayedCardsComponent } from './played-cards/played-cards.component';
import {LoginComponent} from "./login/login.component";
import {MatInputModule} from "@angular/material/input";
import {MatCardModule} from "@angular/material/card";
import {RouterModule, RouterOutlet} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {routes} from "./routes";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NavMenuComponent} from "./nav-menu/nav-menu.component";

@NgModule({
  declarations: [
    AppComponent,
    PlayerComponent,
    CardComponent,
    GameBoardComponent,
    PlayedCardsComponent,
    LoginComponent,
    NavMenuComponent,
  ],
    imports: [
        BrowserModule,
        MatInputModule,
        MatCardModule,
        RouterOutlet,
        ReactiveFormsModule,
        MatButtonModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        MatIconModule,
        MatToolbarModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
