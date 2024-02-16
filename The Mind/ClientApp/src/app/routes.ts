import {Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {GameBoardComponent} from "./game-board/game-board.component";
import {AuthGuard} from "./auth.guard";
export const routes: Routes = [
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'login', component: LoginComponent},
  {path: 'board', component: GameBoardComponent, canActivate: [AuthGuard]}
  // { path: '**', component: NotFoundComponent },
];
