import { TPictureNumber } from './type';

export class PictureNumber implements TPictureNumber {
  static build(number: Number) {
    return new PictureNumber(number, number.toString());
  }

  equal(compare: TPictureNumber) {
    return this.number === compare.number;
  }

  private constructor(readonly number: Number, readonly str: string) {}
}
