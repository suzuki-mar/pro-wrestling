import { TTweetBase, TweetType, TPictureTweet, TTextOnlyTweet } from 'integrations/twitter';
import * as _ from 'lodash';

export class TweetFilter {
  static filterPictures(tweets: TTweetBase[]): TPictureTweet[] {
    const result = tweets.map((tweet) => {
      if (this.isPicture(tweet)) {
        return tweet;
      }

      return undefined;
    });

    return _.compact(result);
  }

  static filterTextOnlys(tweets: TTweetBase[]): TTextOnlyTweet[] {
    const result = tweets.map((tweet) => {
      if (this.isTextOnly(tweet)) {
        return tweet;
      }

      return undefined;
    });

    return _.compact(result);
  }

  static filterRtweets(tweets: TTweetBase[]): TTweetBase[] {
    const rtweets = tweets.filter((tweet) => {
      return tweet.text.indexOf('RT ') === 0;
    });

    return rtweets;
  }

  private static isPicture(tweet: TTweetBase): tweet is TPictureTweet {
    return tweet.type === TweetType.Picture;
  }

  private static isTextOnly(tweet: TTweetBase): tweet is TTextOnlyTweet {
    return tweet.type === TweetType.TextOnly;
  }
}
