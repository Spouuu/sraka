import { Component, ChangeDetectorRef, NgZone } from '@angular/core';
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

  clickMultiplier = 1;
  megaButterMultiplier = 1;

  autoclicker = false;
  private autoclickerInterval: any;

  autoButterMultiplier = 1;

  criticalMessage = false;
  criticalAmount = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  buyBetterButter() {
    if (this.licznikButter < 10 || this.clickMultiplier > 1) return;

    this.licznikButter -= 10;
    this.clickMultiplier = 2;
  }

  buyGoldenButter() {
    if (this.licznikButter < 50 || this.clickMultiplier > 2) return;

    this.licznikButter -= 50;
    this.clickMultiplier = 4;
  }

  buyButterJeden() {

    let butter = Math.floor(this.mnoznikButter);

    butter = butter * this.clickMultiplier;
    butter = butter * this.megaButterMultiplier;

    const critical = Math.random() < 0.05;

    if (critical) {

      this.criticalAmount = butter * 5;
      this.licznikButter += this.criticalAmount;

      this.criticalMessage = true;
      this.cdr.detectChanges();

      setTimeout(() => {
        this.criticalMessage = false;
        this.cdr.detectChanges();
      }, 700);

    } else {

      this.licznikButter += butter;
      this.cdr.detectChanges();

    }
  }

  autoButter() {

    if (this.licznikButter < 100 || this.autoclicker) return;

    this.licznikButter -= 100;
    this.autoclicker = true;

    this.startAutoButter();
  }

  startAutoButter() {

    this.autoclickerInterval = setInterval(() => {

      let butter = Math.floor(this.mnoznikButter);

      butter = butter * this.megaButterMultiplier;

      this.licznikButter += butter;

      this.cdr.detectChanges();

    }, 1000 / this.autoButterMultiplier);
  }

  betterAutoButter() {

    if (
      this.licznikButter < 500 ||
      !this.autoclicker ||
      this.autoButterMultiplier > 1
    ) return;

    this.licznikButter -= 500;

    this.autoButterMultiplier = 2;

    clearInterval(this.autoclickerInterval);

    this.startAutoButter();
  }

  buyMegaButter() {

    if (
      this.licznikButter < 10000 ||
      this.megaButterMultiplier > 1
    ) return;

    this.licznikButter -= 10000;
    this.megaButterMultiplier = 2;
  }
}