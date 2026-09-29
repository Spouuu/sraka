import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  licznikButter = 0;

  kupButter() {
    this.licznikButter++;
  }
}
