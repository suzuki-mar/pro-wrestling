import { TPictureTweet, TTextOnlyTweet, TTweet, TweetType } from 'integrations/twitter';
import faker from 'faker';
import { SampleData } from '../sampleData';
import { TWrestlerName } from 'app/core/wreslter';
import * as _ from 'loadsh';

export class TweetData {
  static tweets(): TTweet[] {
    return [
      ...this.pictures(),
      this.buildTextOnly([SampleData.meiName()]),
      this.buildTextOnly([SampleData.mioName(), SampleData.meiName()]),
    ];
  }

  static pictures(): TPictureTweet[] {
    const meiTweet = this.buildPicture([SampleData.meiName()]);

    let tweetAtSameTime = this.buildPicture([SampleData.meiName()]);
    tweetAtSameTime = Object.assign(tweetAtSameTime, { tweeted_at: meiTweet.tweeted_at });

    return [
      meiTweet,
      tweetAtSameTime,
      this.buildPicture([SampleData.mioName(), SampleData.meiName(), SampleData.meiName()]),
    ];
  }

  private static buildTextOnly(names: TWrestlerName[]): TTextOnlyTweet {
    let hashtags = names.map((name) => name.full);
    hashtags = [...hashtags, faker.lorem.slug()];

    return {
      id: faker.datatype.number(),
      text: faker.lorem.text(),
      type: TweetType.TextOnly,
      hashtags: hashtags,
      tweeted_at: faker.datatype.datetime(),
      contributor: faker.name.firstName(),
    };
  }

  private static buildPicture(names: TWrestlerName[]): TPictureTweet {
    const pictureURL = faker.image.imageUrl() + _.random(0, 100000);
    return {
      ...this.buildTextOnly(names),
      pictureURL: pictureURL,
      type: TweetType.Picture,
      pictureNumber: _.random(1000),
    };
  }
}
