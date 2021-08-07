import { ApiV2Includes, TweetV2 } from 'twitter-api-v2';
import { IncludeItem } from './type';
import * as _ from 'loadsh';

export class PictureURL implements IncludeItem {
  private _values = {};
  private _disable = false;

  canUse(includes: ApiV2Includes): boolean {
    return includes.media !== undefined;
  }

  setUpValues(includes: ApiV2Includes) {
    // ID検索で画像が全部ないパターンなど
    if (includes.media === undefined) {
      this._disable = true;
    }

    includes.media!.forEach((medium) => {
      if (medium.type !== 'photo') {
        return;
      }

      this._values[medium.media_key] = medium.url!;
    });
  }

  valid(tweet: TweetV2): boolean {
    if (tweet.attachments === undefined) {
      return false;
    }

    // メディアがphotoではない場合
    const mediaKeys = tweet.attachments.media_keys!;

    const isAllPictures = mediaKeys.every((key) => {
      return _.some(this._values, (u, k) => {
        return key === k;
      });
    });

    return isAllPictures;
  }

  createIncludesDatas(tweet: TweetV2): {} {
    const mediaKeys = tweet.attachments!.media_keys!;
    let photoURLs: { id: string; url: string }[] = [];

    mediaKeys.forEach((key) => {
      const url = _.find(this._values, (u, k) => {
        return key === k;
      });

      photoURLs = [...photoURLs, { id: key, url: url! }];
    });

    return { photoURLs: photoURLs };
  }
}
