import { TPicture, TSource } from 'app/wrespic';
import { IWrestlerName, IWrestler } from 'app/core/wreslter';
import { TPictureTweet, TTweet } from 'integrations/twitter/interface';
import { WrestlerData } from './wrestlerData';
import { TweetData } from './tweetData';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { PictureURLStr } from './pictureURLStr';
import faker from 'faker';

export class SampleData {
  static wrestlerNames(): IWrestlerName[] {
    return WrestlerData.names();
  }

  static wrestlerName(): IWrestlerName {
    return WrestlerData.wrestlerName();
  }

  static wrestlers(): IWrestler[] {
    return WrestlerData.wrestlers();
  }

  static wrestler(): IWrestler {
    return WrestlerData.wrestlers()[0]!;
  }

  static wrestlerPictureURL(): TSource {
    return WrestlerData.pictureURL();
  }

  static picture(): TPicture {
    const wrestlerPictureURL = this.wrestlerPictureURL();
    return {
      urlStr: wrestlerPictureURL.urlStr,
      wrestlerNames: [wrestlerPictureURL.name],
      date: wrestlerPictureURL.date,
      fileName: undefined,
    };
  }

  static picturesOfMei(): TSource[] {
    const urls = PictureURLStr.mei();

    const name = new WrestlerName('星月芽依');

    return urls.map((url) => {
      return {
        urlStr: url,
        name: name,
        date: this.matchDay(),
      };
    });
  }

  static picturesOfMaria(): TSource[] {
    const urls = PictureURLStr.maria();

    const name = new WrestlerName('Maria');

    return urls.map((url) => {
      return {
        urlStr: url,
        name: name,
        date: this.matchDay(),
      };
    });
  }

  static imageURLStr(): string {
    return PictureURLStr.str();
  }

  static url(): URL {
    return new URL(this.imageURLStr());
  }

  static tweets(): TTweet[] {
    return TweetData.tweets();
  }

  static pictureTweets(): TPictureTweet[] {
    return TweetData.pictures();
  }

  private static matchDay(): Date {
    return faker.date.recent(10);
  }
}
