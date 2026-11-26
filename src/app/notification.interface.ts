import { NotificationType } from './notification-type';

export interface INotification {
  id: number;
  type: NotificationType;
  text: string;
}

