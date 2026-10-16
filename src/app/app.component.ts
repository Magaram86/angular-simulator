import { Component } from '@angular/core';
import './training';
import { Color } from './Color';
import { Collection } from './Collection';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName: string = 'РУМТИБЕТ';
  numbers: number[] = [10, 20, 30, 40, 50];
  numbersCollection: Collection<number> = new Collection(this.numbers);

  names: string[] = ['Иван', 'Алексей', 'Мария'];
  namesCollection: Collection<string> = new Collection(this.names);

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();
  }

  isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  saveLastVisit(): void {
    const currentDate: Date = new Date();
    localStorage.setItem('lastVisit', currentDate.toString());
  }

  saveVisitCount(): void {
    const visitCount: number = Number(localStorage.getItem('visitCount')) || 0;
    localStorage.setItem('visitCount', String(visitCount + 1));
  }
}
