import { Component } from '@angular/core';
import { CountriesData, OptionsData, FamousData } from '../../data';
import { CommonModule } from '@angular/common';

import {MatButtonModule} from '@angular/material/button';
import { GameModalComponent } from '../../components/game-modal/game-modal.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-options',
  standalone: true,
  imports: [CommonModule, MatButtonModule, GameModalComponent],
  templateUrl: './game-options.component.html',
  styleUrl: './game-options.component.scss'
})
export class GameOptionsComponent {

  // countdown
  totalTime:number = 500;
  timeEnd:number = 0;
  isHiddenMod:boolean = true;
  isSelectedOption:boolean = false;
  selectedOption:number = 1;
  selectedOptionText:string = '';
  isCorrect:boolean = false;
  isHiddenTime:boolean = false;


  // countries = CountriesData;
  countries = FamousData;
  options = OptionsData;
  optionsData = OptionsData;
  optionsTemp = OptionsData;
  childsMessage: string = 'popo';
  correctOption: number = 1;
  primeroOk: number = 0;
  segundoOk: number = 0;
  classOption: string = 'card';

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const idTheme = this.route.snapshot.paramMap.get('id');

    if(idTheme) {
      switch (idTheme) {
        case '1':
          this.countries = FamousData;
          break;
        case '2':
          this.countries = CountriesData;
          break;
        case '3':
          
          break;
        case '4':
          
          break;
        default:
          break;
      }
    }


    this.countries.sort((x, y) => x.name.localeCompare(y.name));

    this.optios(1);
    this.countdown();

    console.log(this.route.snapshot.paramMap.get('id'));

    
  }

  countdown() {
    let intervalTime = setInterval(() => {
      if(this.totalTime === 0){
        clearInterval(intervalTime)
        this.isHiddenMod = false;
      }else{
        this.totalTime-=1;
      }
    }, 1000);
  }

  confirm() {
    this.isHiddenMod = false;
  }

  selectOption(e: any): void {
    this.classOption = e.currentTarget.className.indexOf('card-1') > -1 ? 'card-act-1' : 'card-act-2';
    this.selectedOption = this.classOption.indexOf('1') > -1 ? 1 : 2;
    this.isSelectedOption = true;
    this.selectedOptionText = this.options[this.selectedOption - 1].name;

    if(this.classOption.indexOf('1') > -1 && this.correctOption === 1) {
      // console.log('correct: ', this.correctOption);
      this.isCorrect = true;
    } else  if(this.classOption.indexOf('2') > -1 && this.correctOption === 2) {
      // console.log('correct: ', this.correctOption);
      this.isCorrect = true;
    } else {
      console.log('ERROR');
      this.isCorrect = false;
    }
  }




  optios(difficulty: any) {

    const numberMap = 1;//Math.floor(Math.random() * 1) + 13;
    let valueData = 0;
    let dateData = '1100-01-01';
    let isOptionsSelected = false;

    this.options = []
    this.optionsData = []
    this.optionsTemp = []

    this.correctOption = 1;

    if(difficulty === 1) {
      let otra = true
  
      this.countries.reduce((valorAnterior, valorActual) => {
        if(valorActual.similar === numberMap && valorActual.active) {
          valorAnterior.push(valorActual)
        }
        
        return this.optionsTemp;
      }, this.optionsTemp)

      if (this.optionsTemp.length < 2) {
        this.optios(difficulty);
        return;
      }

      this.countries.forEach(countrie => {
        if(countrie.similar === numberMap) {
          if(countrie.active) {
            if(this.options.length < 2) {
              this.options.push(countrie);
              countrie.active = false;
            } else if(this.options.length == 2 && !isOptionsSelected) {
              isOptionsSelected = true
            }
          }
        }

    
        if (countrie.active) {
          this.optionsData.push(countrie);
        }      

      });

      this.options.forEach((option, index) => {       
        if(option.date === '') {
          if(option.value > valueData) {
            this.correctOption = index + 1;
            valueData = option.value;
  
            if (this.correctOption === 2) {
              this.primeroOk = this.primeroOk === 0 ? 0 : this.primeroOk - 1;
              this.segundoOk++;
            } else {
              this.primeroOk++;
            }
          }
        } else {
          const dateActDate = new Date(option.date);
          const dateDataDate = new Date(dateData);

          // console.log(dateActDate);
          // console.log(dateDataDate);

          if(dateData.indexOf('1100') > -1) {
            this.segundoOk = this.segundoOk === 0 ? 0 : this.segundoOk - 1;
            this.primeroOk++;
            this.correctOption = index + 1;
          } else {
            if(dateActDate < dateDataDate){
              // fecha actual es mas antigua
              this.segundoOk = this.segundoOk === 0 ? 0 : this.segundoOk - 1;
              this.primeroOk++;
              this.correctOption = index + 1;
            } 
          }

          dateData = option.date;

          // console.log('primeroOk: ', this.primeroOk);
          // console.log('segundoOk: ', this.segundoOk);
          // console.log('correctOption: ', this.correctOption);
          
          // if(dateData !== '' && option.date > dateData) {
          //   this.correctOption = index + 1;
          //   dateData = option.date;
            
          //   if (this.correctOption === 2) {
          //     this.primeroOk = this.primeroOk === 0 ? 0 : this.primeroOk - 1;
          //     this.segundoOk++;
          //   } else {
          //     this.primeroOk++;
          //   }
          // } else {
          //   this.correctOption = index + 1;
          //   dateData = option.date;
          // }
        }
      });

      this.countries.reduce((acumulador, fruta) => {
          if (fruta.active) {
            acumulador = fruta
          }
          return acumulador;
      }, {})
    }
  }
}
