import { TPictureURL, TPictureNumber } from 'app/wrespic';

export class PictureURL implements TPictureURL {
  static build(
    originalURL: string,
    thumbnailURL: string,
    defaultSizeURL: string,
    number: TPictureNumber
  ) {
    return new PictureURL(originalURL, thumbnailURL, defaultSizeURL, number);
  }

  protected constructor(
    readonly originalURL: string,
    readonly thumbnailURL: string,
    readonly defaultSizeURL: string,
    readonly number: TPictureNumber
  ) {}
}
