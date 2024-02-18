import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-game-modal',
  standalone: true,
  imports: [MatButtonModule, CommonModule, RouterLink, RouterOutlet],
  templateUrl: './game-modal.component.html',
  styleUrl: './game-modal.component.scss'
})
export class GameModalComponent {
  @Input() isHiddenModal: boolean = true;
  @Input() isSelectedOption: boolean = true;
  @Input() selectedOption: number = 1;
  @Input() selectedOptionText: string = '';
  @Input() isCorrect: boolean = false;

  isConfirm: boolean = false;


  ngOnInit() {

  }

  confirm() {
    console.log(111);
    this.isConfirm = true;
  }
}
