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

  butterFactory = false;
  goldenCow = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) {}

  getNextUpgrade() {

  if (this.clickMultiplier === 1) {
    return { name: 'Better Butter', cost: 10 };
  }

  if (this.clickMultiplier === 2) {
    return { name: 'Golden Butter', cost: 50 };
  }

  if (!this.autoclicker) {
    return { name: 'AutoButter', cost: 100 };
  }

  if (this.autoButterMultiplier === 1) {
    return { name: 'Better AutoButter', cost: 500 };
  }

  if (!this.butterFactory) {
    return { name: 'Butter Factory', cost: 1500 };
  }

  if (!this.goldenCow) {
    return { name: 'Golden Cow', cost: 3000 };
  }

  if (this.megaButterMultiplier === 1) {
    return { name: 'MEGA BUTTER', cost: 10000 };
  }

  return { name: 'MAXIMUM BUTTER', cost: 10000 };
}


  getProgress() {
    const progress = (this.licznikButter / this.getNextUpgrade().cost) * 100;

    return Math.min(progress, 100);
  }


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

    if (this.goldenCow) {
      butter = butter * 2;
    }

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

  buyButterFactory() {
    if (this.licznikButter < 1500 || this.butterFactory) return;

    this.licznikButter -= 1500;
    this.butterFactory = true;

    setInterval(() => {
      this.licznikButter += 5;
      this.cdr.detectChanges();
    }, 1000);
  }

  buyMegaButter() {

    if (
      this.licznikButter < 10000 ||
      this.megaButterMultiplier > 1
    ) return;

    this.licznikButter -= 10000;
    this.megaButterMultiplier = 2;
  }

  buyGoldenCow() {

  if (
    this.licznikButter < 3000 ||
    this.goldenCow
  ) return;

  this.licznikButter -= 3000;
  this.goldenCow = true;
}
}