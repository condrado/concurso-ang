import { Routes } from '@angular/router';
import { GameOptionsComponent } from './pages/game-options/game-options.component';
import { GameBoardComponent } from './pages/game-board/game-board.component';

export const routes: Routes = [
  { path: '', title: 'Opciones', component: GameOptionsComponent }, 
  { path: 'game-options/:id', title: 'Opciones', component: GameOptionsComponent }, 
  { path: 'game-board', title: 'Tablero de juego', component: GameBoardComponent }, 
];