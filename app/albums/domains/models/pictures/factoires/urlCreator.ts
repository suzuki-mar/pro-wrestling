import { TPictureSizeTypes, TPictureTweet, TPictureTweetResizedURL } from 'integrations/twitter';
import { PictureNumber } from '../pictureNumber';
import { PictureURL } from '../pictureURL';
import { TPictureURL } from 'app/albums';

export class URLCreator {
  creates(tweets: TPictureTweet[]): TPictureURL[] {
    let urls: TPictureURL[] = [];

    tweets.forEach((tweet) => {
      tweet.items.forEach((item) => {
        const number = PictureNumber.build(item.pictureNumber);

        const resizedURLs = this.selectResizedURLs(item.pictureResizedURLs);
        const url = PictureURL.build(
          item.pictureOriginalURL,
          resizedURLs['thumb'],
          resizedURLs['default'],
          number
        );
        urls = [...urls, url];
      });
    });

    return urls;
  }

  private selectResizedURLs(pictureResizedURLs: TPictureTweetResizedURL[]): {} {
    let thumb = pictureResizedURLs.find((url) => {
      return url.type === TPictureSizeTypes.Thumb;
    });

    let defaultSize = pictureResizedURLs.find((url) => {
      return url.type === TPictureSizeTypes.Small;
    });

    return { thumb: thumb!.src, default: defaultSize!.src };
  }
}
