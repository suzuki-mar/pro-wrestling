import { TPictureURL, TPictureNumber } from 'app/albums';

export class PictureURL implements TPictureURL {
  static build(
    originalURL: string,
    thumbnailURL: string,
    defaultSizeURL: string,
    number: TPictureNumber
  ) {
    return new PictureURL(originalURL, thumbnailURL, defaultSizeURL, number);
  }

  equal(compare: TPictureURL): boolean {
    return this.originalURL === compare.originalURL;
  }

  protected constructor(
    readonly originalURL: string,
    readonly thumbnailURL: string,
    readonly defaultSizeURL: string,
    readonly number: TPictureNumber
  ) {}
}
