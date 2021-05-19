import { Twitter } from '../../integrations/twitter/client';
import { Tweet, TwitterParams } from '../../integrations/interface';
import { Wrestler } from '../wresler/wrestler';
import * as _ from 'lodash';

export class Searcher {
  searchWreslersFromTwitter(query: TwitterParams) {
    const twitter = new Twitter();
    const tweets = twitter.search(query);

    const that = this;
    return Promise.resolve(tweets)
      .then(function (tweets) {
        _.map(tweets, function (tweet) {
          that.extractWreslerNamesFromTweetText(tweet);
        });
      })
      .catch(function (error) {
        throw error;
      });
  }

  private extractWreslerNamesFromTweetText(tweet: Tweet): Wrestler[] {
    console.log(tweet.text.split('/n'));

    //     // tweetから行単位でtextを分割
    //     // lines = tweet...

    //     // 選手名を羅列しているlinesをを取り出す
    //     // nameLines = lines....

    //     nameLines.map(function (line) {
    //         // 選手名以外の不要な部分を切り出す
    //         //  const name = line....
    //         return new Wresler(line){

    //         }

    //     })

    return [];
  }
}
