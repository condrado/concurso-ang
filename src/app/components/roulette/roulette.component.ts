import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roulette',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './roulette.component.html',
  styleUrl: './roulette.component.scss'
})
export class RouletteComponent {
  generatedNumber: number = 1;
  sending: string = '';
  listThemes:Array<string> = [
    'Edad famosos',
    'Población',
    "Garaje de ideas",
    "Frontend"
  ]

  onNumberGenerated(generatedNumber: number): void {
    this.generatedNumber = generatedNumber;
  }

  generateNumber(): void {
    let i = 0;
    let time = 50;
    const newNumber = setInterval(() => {
      i++
      this.sending = "sending"
      this.generatedNumber = Math.floor(4 * Math.random());
      if(i === 40) {
        time = 100
      }
      if(i === 50) {
        time = 300
      }
      if(i === 55) {
        time = 800
      }
      if(i === 60) {
        this.sending = "end";

        clearInterval(newNumber);
      }
    }, 50)
  }
}
