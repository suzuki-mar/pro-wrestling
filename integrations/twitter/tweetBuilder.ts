import { TTextOnlyTweet, TPictureTweet, TTweet, TweetType, TTweetBase } from '.';
import * as _ from 'lodash';

export class TweetBuilder {
  static build(data: any): TTweet {
    const media = data['entities']['media'];

    const hashtags = _.map(data['entities']['hashtags'], (hashtag) => {
      return hashtag['text'];
    });

    const base: TTweetBase = {
      id: data['id_str'] as Number,
      text: data['text'] as string,
      hashtags: hashtags,
      type: TweetType.Unknown,
      contributor: data['user']['screen_name'],
      tweeted_at: new Date(data['created_at']),
    };

    const photoInfo = this.buildPhotoInfo(media);
    if (photoInfo === undefined) {
      const tweet: TTextOnlyTweet = Object.assign(base, { type: TweetType.TextOnly });
      return tweet;
    }

    const tweet: TPictureTweet = Object.assign(base, {
      type: TweetType.Picture,
      pictureURL: photoInfo.pictureURL,
      pictureNumber: photoInfo.pictureNumber,
    });
    return tweet;
  }

  // FIXME 一旦画像は１つだけの前提

  private static buildPhotoInfo(
    media: any
  ): { pictureURL: string; pictureNumber: Number } | undefined {
    if (media === undefined) {
      return undefined;
    }

    const medium = media[0];

    if (medium['type'] === 'photo') {
      return { pictureURL: medium['media_url'], pictureNumber: medium['id'] };
    }

    return undefined;
  }
}
