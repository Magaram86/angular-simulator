
import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import './training';
import { Color } from './Color';
import { Collection } from './Collection';
import { NotificationService } from './notification.service';
import { NgTemplateOutlet } from '@angular/common';
import { NotificationType } from './notification-type';
import { LocalStorageService } from './local-storage.service';
interface ITourBenefit {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface IPopularTour {
  id: number;
  title: string;
  description: string;
  rating: number;
  price: number;
  image: string;
}

interface ITravelBlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  image: string;
}

@Component({
  selector: 'app-root',
  imports: [FormsModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnDestroy {
  readonly notificationService = inject(NotificationService);
  private readonly localStorageService = inject(LocalStorageService);
  readonly notificationType = NotificationType;
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
      icon: 'experienced-guide-icon',
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активности.',
      icon: 'safe-hiking-icon',
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активности.',
      icon: 'affordable-price-icon',
    },
  ];

  readonly popularTours: IPopularTour[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      description: 'романтическое приключение',
      rating: 4.9,
      price: 480,
      image: 'lake-near-mountains',
    },
    {
      id: 2,
      title: 'Ночь в горах',
      description: 'в компании друзей',
      rating: 4.5,
      price: 500,
      image: 'night-in-mountains',
    },
    {
      id: 3,
      title: 'Растяжка в горах',
      description: 'для тех, кто заботится о себе',
      rating: 5.0,
      price: 230,
      image: 'stretching-in-mountains',
    },
  ];

  readonly travelBlogPosts: ITravelBlogPost[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      image: 'italian-coast',
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      date: '01/04/2023',
      image: 'airplane-sunset',
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку?',
      description: 'Для современного мира базовый вектор развития предполагает.',
      date: '01/04/2023',
      image: 'european-street',
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      date: '01/04/2023',
      image: 'taj-mahal',
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
    this.localStorageService.set('lastVisit', currentDate.toString());
  }

  private saveVisitCount(): void {
    const visitCount: number = this.localStorageService.get<number>('visitCount') ?? 0;
    this.localStorageService.set('visitCount', visitCount + 1);
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
