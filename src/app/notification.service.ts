import { Injectable, signal } from '@angular/core';
import { INotification } from './notification.interface';
import { NotificationType } from './notification-type';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  readonly messages = signal<INotification[]>([]);
  private nextId = 1;

  addMessage(type: NotificationType, text: string): void {
    const message: INotification = {
      id: this.nextId++,
      type,
      text,
    };

    this.messages.update((messages) => [message, ...messages]);
    setTimeout(() => {
      this.closeMessage(message.id);
    }, 5000);
  }

  closeMessage(id: number): void {
    this.messages.update(messages =>
      messages.filter(message => message.id !== id)
    );
  }
}
