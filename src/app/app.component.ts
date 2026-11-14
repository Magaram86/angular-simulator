
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import './training';
import { Color } from './Color';
import { Collection } from './Collection';

interface ITourBenefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  companyName: string = 'РУМТИБЕТ';
  tourLocation: string = '';
  tourDate: string = '';
  tourParticipants: string = '';
  liveInputText: string = '';
  currentDate: Date = new Date();
  counter: number = 0;
  showDateTime: boolean = true;
  isLoading: boolean = true;
  numbers: number[] = [10, 20, 30, 40, 50];
  numbersCollection: Collection<number> = new Collection(this.numbers);
  names: string[] = ['Иван', 'Алексей', 'Мария'];
  namesCollection: Collection<string> = new Collection(this.names);

  readonly tourBenefits: ITourBenefit[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активности.',
      icon: 'experienced-guide-icon.',
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активности.',
      icon: 'safe-hiking-icon.',
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активности.',
      icon: 'affordable-price-icon.',
    },
  ];

  private timerId: ReturnType<typeof setInterval> | undefined;
  private loadingTimerId: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    this.saveLastVisit();
    this.saveVisitCount();

    this.timerId = setInterval((): void => {
      this.currentDate = new Date();
    }, 1000);

    this.loadingTimerId = setTimeout((): void => {
      this.isLoading = false;
    }, 2000);
  }

  isPrimaryColor(color: Color): boolean {
    return color === Color.RED || color === Color.GREEN || color === Color.BLUE;
  }

  private saveLastVisit(): void {
    const currentDate: Date = new Date();
    localStorage.setItem('lastVisit', currentDate.toString());
  }

  private saveVisitCount(): void {
    const visitCount: number = Number(localStorage.getItem('visitCount')) || 0;
    localStorage.setItem('visitCount', String(visitCount + 1));
  }

  incrementCounter(): void {
    this.counter++;
  }

  decrementCounter(): void {
    if (this.counter > 0) {
      this.counter--;
    }
  }

  toggleHeaderDisplay(): void {
    this.showDateTime = !this.showDateTime;
  }

  ngOnDestroy(): void {
    if (this.timerId !== undefined) {
      clearInterval(this.timerId);
    }

    if (this.loadingTimerId !== undefined) {
      clearTimeout(this.loadingTimerId);
    }
  }
}
