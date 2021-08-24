import { TweetV2 } from 'twitter-api-v2';
import { TTwitterID } from '..';
import { TwitterID } from '../twitterID';
import { IncludeItem } from './includeItemController/type';
import { SearchResponseItem } from './type';

export class ItemCreator {
  static create(tweet: TweetV2, includeItems: IncludeItem[]): SearchResponseItem | undefined {
    const valid = includeItems.every((itemController) => {
      return itemController.valid(tweet);
    });

    if (!valid) {
      return undefined;
    }

    const tweetId: TTwitterID = TwitterID.build(tweet.id);

    let item = {
      id: tweetId,
      text: tweet.text,
      tweeted_at: new Date(tweet.created_at!),
      hashtags: this.createHashtags(tweet),
    };

    includeItems.forEach((itemController) => {
      const includeData = itemController.createIncludesDatas(tweet);
      item = Object.assign(item, includeData);
    });

    return item as SearchResponseItem;
  }

  static createHashtags(tweet: TweetV2): string[] {
    const isRT = tweet.text.startsWith('RT');

    if (isRT) {
      return [];
    }

    if (tweet.entities?.hashtags === undefined) {
      return [];
    }

    return tweet.entities!.hashtags.map((hashtag) => {
      return hashtag.tag;
    });
  }
}
