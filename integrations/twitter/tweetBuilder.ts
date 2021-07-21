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
      tweeted_at: new Date(data['created_at']),
    };

    const photoURL = this.buildPhotoURL(media);
    if (photoURL === undefined) {
      const tweet: TTextOnlyTweet = Object.assign(base, { type: TweetType.TextOnly });
      return tweet;
    }

    const tweet: TPictureTweet = Object.assign(base, {
      type: TweetType.Picture,
      pictureURL: photoURL,
    });
    return tweet;
  }

  // FIXME 一旦画像は１つだけの前提
  private static buildPhotoURL(media: any): string | undefined {
    if (media === undefined) {
      return undefined;
    }

    const medium = media[0];

    if (medium['type'] === 'photo') {
      return medium['media_url'];
    }

    return undefined;
  }
}
