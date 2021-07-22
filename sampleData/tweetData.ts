import { TPictureTweet, TTextOnlyTweet, TTweet, TweetType } from 'integrations/twitter';
import faker from 'faker';
import { SampleData } from '../sampleData';
import { TWrestlerName } from 'app/core/wreslter';

export class TweetData {
  static tweets(): TTweet[] {
    return [
      ...this.pictures(),
      this.buildTextOnly(SampleData.meiName()),
      this.buildTextOnly(SampleData.mioName()),
    ];
  }

  static pictures(): TPictureTweet[] {
    return [this.buildPicture(SampleData.meiName()), this.buildPicture(SampleData.mioName())];
  }

  private static buildTextOnly(name: TWrestlerName): TTextOnlyTweet {
    return {
      id: faker.datatype.number(),
      text: faker.lorem.text(),
      type: TweetType.TextOnly,
      hashtags: [faker.lorem.slug(), name.full],
      tweeted_at: faker.datatype.datetime(),
      contributor: faker.name.firstName(),
    };
  }

  private static buildPicture(name: TWrestlerName): TPictureTweet {
    return { ...this.buildTextOnly(name), pictureURL: SampleData.imageURLStr() };
  }
}
