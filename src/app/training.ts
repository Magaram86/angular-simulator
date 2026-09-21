export interface IUser {
  id: number;
  name: string;
  email: string;
  age?: number;
}

export interface IAdmin extends IUser {
  role: string;
  permissions: string[];
}

export type UploadStatus = 'loading' | 'success' | 'error';
export type TextFormat = 'uppercase' | 'lowercase' | 'capitalize';

export const uploadStatus: UploadStatus = 'loading';
export const textFormat: TextFormat = 'uppercase';

export function sum(a: number, b: number): number {
  return a + b;
}

export function formatText(str: string, format: TextFormat): string {
  if (format === 'uppercase') {
    return str.toUpperCase();
  }
  if (format === 'lowercase') {
    return str.toLowerCase();
  }
  if (format === 'capitalize') {
    if (!str) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  return str;
}

export function removeCharacter(str: string, char: string): string {
  return str.replaceAll(char, '');
}

export function filterUsersByAge(users: IUser[], minAge: number): IUser[] {
  return users.filter((user) => user.age !== undefined && user.age >= minAge);
}