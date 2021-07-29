import {
  TTextOnlyTweet,
  TPictureTweet,
  TTweet,
  TweetType,
  TTweetBase,
  TPictureTweetItem,
  TPictureTweetResizedURL,
  TPictureSizeType,
} from '.';
import * as _ from 'lodash';

export class TweetBuilder {
  static build(data: any): TTweet {
    const base = this.buildBase(data);

    const pictureItems = this.buildPictureItems(data['entities']['media']);
    if (pictureItems === undefined) {
      const tweet: TTextOnlyTweet = Object.assign(base, { type: TweetType.TextOnly });
      return tweet;
    }

    const tweet: TPictureTweet = Object.assign(base, {
      type: TweetType.Picture,
      items: pictureItems,
    });
    return tweet;
  }

  private static buildBase(data): TTweetBase {
    const hashtags = _.map(data['entities']['hashtags'], (hashtag) => {
      return hashtag['text'];
    });

    return {
      id: data['id_str'] as Number,
      text: data['text'] as string,
      hashtags: hashtags,
      type: TweetType.Unknown,
      contributor: data['user']['screen_name'],
      tweeted_at: new Date(data['created_at']),
    };
  }

  private static buildPictureItems(media: any): TPictureTweetItem[] | undefined {
    if (media === undefined) {
      return undefined;
    }

    let mediaItems: TPictureTweetItem[] = [];
    media.forEach((medium) => {
      if (medium['type'] === 'photo') {
        mediaItems = [
          ...mediaItems,
          {
            pictureResizedURLs: this.buildResizedURL(medium),
            pictureOriginalURL: medium['media_url'],
            pictureNumber: medium['id'],
          },
        ];
      }
    });

    if (mediaItems.length > 0) {
      return mediaItems;
    }

    return undefined;
  }

  private static buildResizedURL(mediumData): TPictureTweetResizedURL[] {
    const urls = _.map(mediumData['sizes'], (info, type) => {
      const size = { height: info['h'], width: info['w'] };
      const src = mediumData['media_url'] + ':' + type;
      return { size: size, type: type as TPictureSizeType, src: src };
    });

    return urls;
  }
}
