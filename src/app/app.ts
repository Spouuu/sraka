import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [DecimalPipe]
})
export class App {
  mnoznikButter = 1;
  licznikButter = 0;

  buyBetterButter(){
    this.mnoznikButter += 0.25
    this.licznikButter -= 10
  }

  buyGoldenButter(){
    this.mnoznikButter += 1
    this.licznikButter -= 50
  }


  buyButterJeden() {
    this.licznikButter += Math.floor(this.mnoznikButter);
  }
}
