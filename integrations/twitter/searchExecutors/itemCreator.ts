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

// export type TTweetSiteURL = TTweetBaseURL & {
//   description: string;
//   title: string;
// };

// Object {
//   "description": "10分1500円。選手独占！各時間帯チケット限定1枚！先着順！",
//   "display_url": "passmarket.yahoo.co.jp/event/show/det…",
//   "end": 23,
//   "expanded_url": "https://passmarket.yahoo.co.jp/event/show/detail/0141971tcfu11.html",
//   "images": Array [
//     Object {
//       "height": 360,
//       "url": "https://pbs.twimg.com/news_img/1423842746184306692/wPzMZli-?format=jpg&name=orig",
//       "width": 600,
//     },
//     Object {
//       "height": 150,
//       "url": "https://pbs.twimg.com/news_img/1423842746184306692/wPzMZli-?format=jpg&name=150x150",
//       "width": 150,
//     },
//   ],
//   "start": 0,
//   "status": 200,
//   "title": "8/9 桃野美桜　オンラインリングサイド　",
//   "unwound_url": "https://passmarket.yahoo.co.jp/event/show/detail/0141971tcfu11.html",
//   "url": "https://t.co/vGkHvX2C08",
// },
