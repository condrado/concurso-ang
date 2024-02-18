import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RouletteComponent } from '../../components/roulette/roulette.component';
import {MatButtonModule} from '@angular/material/button';
import { TeamComponent } from '../../components/team/team.component';
import { RoundComponent } from '../../components/round/round.component';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, RouletteComponent, MatButtonModule, TeamComponent, RoundComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {
  buttonActive: number = 0;
}
