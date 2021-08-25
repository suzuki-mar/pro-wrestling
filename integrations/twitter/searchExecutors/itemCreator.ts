import { TweetV2 } from 'twitter-api-v2';
import { TTweetPictureURL, TTweetSiteURL, TTweetURL, TTwitterID } from '..';
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

    const urls = this.buildURLs(tweet);
    const tweetId: TTwitterID = TwitterID.build(tweet.id);

    let item = {
      id: tweetId,
      text: tweet.text,
      tweeted_at: new Date(tweet.created_at!),
      hashtags: this.buildHashtags(tweet),
      urls: urls,
    };

    includeItems.forEach((itemController) => {
      const includeData = itemController.createIncludesDatas(tweet);
      item = Object.assign(item, includeData);
    });

    return item as SearchResponseItem;
  }

  private static buildHashtags(tweet: TweetV2): string[] {
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

  private static buildURLs(tweet: TweetV2): TTweetURL[] {
    if (tweet.entities?.urls === undefined) {
      return [];
    }

    let result: (TTweetPictureURL | TTweetSiteURL)[] = [];

    tweet.entities!.urls.forEach((url) => {
      const isPictureURL = url.display_url.startsWith('pic.twitter.com');

      let data: TTweetURL;
      if (isPictureURL) {
        data = { urlStr: url.expanded_url };
      } else {
        data = { description: url.description!, title: url.title!, urlStr: url.expanded_url };
      }

      result = [...result, data];
    });

    return result;
  }
}
