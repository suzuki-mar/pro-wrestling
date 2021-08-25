import { TTweetBase, TTweetSiteURL } from 'integrations/twitter';
import { TicketType, TTicketContent } from '..';

export class TicketContentFactory {
  buildsFromTweets(tweets: TTweetBase[], type: TicketType): TTicketContent[] {
    const targetTweets = tweets.filter((tweet) => {
      return tweet.urls.some((url) => {
        return url.urlStr.startsWith('https://passmarket.yahoo.co.jp');
      });
    });

    return targetTweets.map((tweet) => {
      const url = tweet.urls.find((url) => {
        return url.urlStr.startsWith('https://passmarket.yahoo.co.jp');
      }) as TTweetSiteURL;

      return {
        type: 'rinsai',
        title: url.title,
        message: url.description,
        urlStr: url.urlStr,
      };
    });
  }
}
