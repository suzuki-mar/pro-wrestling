import { TPictureNumber, TPicturePriority } from 'app/albums';

export type PriorityType = 'default' | 'high' | 'low' | 'top' | 'noValue';

export class Priority implements TPicturePriority {
  static readonly MAX_VALUE = 1000;

  static buildFromValue(number: TPictureNumber, value: number) {
    return new Priority(value, number);
  }

  static buildFromType(number: TPictureNumber, type: PriorityType) {
    let value;

    switch (type) {
      case 'default':
        value = this.MAX_VALUE / 2;
        break;
      case 'high':
        value = this.MAX_VALUE / 1.5;
        break;
      case 'low':
        value = this.MAX_VALUE / 4;
        break;
      case 'noValue':
        value = 0;
        break;
      case 'top':
        value = this.MAX_VALUE;
        break;
    }

    return this.buildFromValue(number, value);
  }

  // 一旦計算をしない
  value(): number {
    return this.baseValue;
  }

  protected constructor(readonly baseValue: number, readonly number: TPictureNumber) {}
}
