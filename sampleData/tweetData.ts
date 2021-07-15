import { TPictureTweet, TTextOnlyTweet, TTweet, TweetType } from 'integrations/twitter/interface';
import faker from 'faker';
import { SampleData } from '../sampleData';

export class TweetData {
  static tweets(): TTweet[] {
    return [...this.pictures(), this.buildTextOnly(), this.buildTextOnly()];
  }

  static pictures(): TPictureTweet[] {
    return [this.buildPicture(), this.buildPicture()];
  }

  private static buildTextOnly(): TTextOnlyTweet {
    const wreslerName = SampleData.wrestlerName();

    return {
      id: faker.datatype.number(),
      text: faker.lorem.text(),
      type: TweetType.TextOnly,
      hashtags: [faker.lorem.slug(), wreslerName.full],
      tweeted_at: faker.datatype.datetime(),
    };
  }

  private static buildPicture(): TPictureTweet {
    return { ...this.buildTextOnly(), pictureURL: SampleData.imageURLStr() };
  }
}
