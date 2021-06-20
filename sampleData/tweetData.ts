import { TPictureTweet, TTweet, TweetType } from 'integrations/twitter/interface';
import faker from 'faker';
import { SampleData } from '../sampleData';

export class TweetData {
  static tweets(): TTweet[] {
    const wreslerNames = SampleData.wrestlerNames();
    let tweets = this.pictures() as TTweet[];
    tweets.push({
      id: faker.datatype.number(),
      text: faker.lorem.text(),
      type: TweetType.TextOnly,
      hashtags: [faker.lorem.slug(), wreslerNames[0]!.full],
      tweeted_at: faker.datatype.datetime(),
    });

    return tweets;
  }

  static pictures(): TPictureTweet[] {
    const names = SampleData.wrestlerNames().slice(0, 2);

    return [
      {
        id: faker.datatype.number(),
        text: faker.lorem.text(),
        pictureURL: SampleData.imageURLStr(),
        hashtags: [faker.lorem.slug(), names[0]!.full],
        type: TweetType.Picture,
        tweeted_at: faker.datatype.datetime(),
      },

      {
        id: faker.datatype.number(),
        text: faker.lorem.text(),
        pictureURL: SampleData.imageURLStr(),
        hashtags: [faker.lorem.slug(), names[0]!.full, names[1]!.full],
        type: TweetType.Picture,
        tweeted_at: faker.datatype.datetime(),
      },
    ];
  }
}
