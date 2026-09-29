import { Component, ChangeDetectorRef } from '@angular/core';
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

  autoclicker = false;
  private autoclickerInterval: any;

  constructor(private cdr: ChangeDetectorRef) {}

  buyBetterButter() {
    if (this.licznikButter < 10) return;

    this.mnoznikButter += 0.25;
    this.licznikButter -= 10;
  }

  buyGoldenButter() {
    if (this.licznikButter < 50) return;

    this.mnoznikButter += 1;
    this.licznikButter -= 50;
  }

  buyButterJeden() {
    this.licznikButter += Math.floor(this.mnoznikButter);
  }

  autoButter() {
    if (this.licznikButter < 100 || this.autoclicker) return;

    this.licznikButter -= 100;
    this.autoclicker = true;

    this.autoclickerInterval = setInterval(() => {
      this.licznikButter += Math.floor(this.mnoznikButter);

      this.cdr.detectChanges();
    }, 1000);
  }
}