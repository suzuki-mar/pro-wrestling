import { TPictureURL } from 'app/wrespic';
import { TPictureNumber, TPictureValueObject } from './type';

export class PictureURL implements TPictureURL, TPictureValueObject {
  static build(originalURL: string, number: TPictureNumber) {
    return new PictureURL(originalURL, number);
  }

  private constructor(readonly originalURL: string, readonly number: TPictureNumber) {}
}
