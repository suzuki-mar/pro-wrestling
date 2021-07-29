import { TweetType, TPictureTweet } from '.';
import faker from 'faker';
import { TweetBuilder } from './tweetBuilder';
import { SampleData } from 'sampleData';

describe('Twitter', () => {
  describe('TextのTweet', () => {
    it('TextOnlyを作成すること', async () => {
      const data = buildTextOnlyData();
      const tweet = TweetBuilder.build(data);

      expect(tweet.type).toEqual(TweetType.TextOnly);
      expect(tweet.text).not.toBeUndefined();
      expect(tweet.id).not.toBeUndefined();
      expect(tweet.hashtags).not.toBeUndefined();
      expect(tweet.contributor).not.toBeUndefined();
      expect(tweet.tweeted_at.toDateString()).toEqual('Sun Jun 20 2021');
    });
  });

  describe('写真付きのTweet', () => {
    it('Pictureを作成すること', async () => {
      const data = buildPhotoData();
      const tweet = TweetBuilder.build(data) as TPictureTweet;
      expect(tweet.type).toEqual(TweetType.Picture);
      expect(tweet.items).not.toBeUndefined();
    });
  });
});

function buildTextOnlyData() {
  return {
    created_at: 'Sun Jun 20 07:54:09 +0000 2021',
    id_str: faker.datatype.number().toString(),
    text: faker.lorem.text(),
    entities: {
      hashtags: [
        { text: faker.lorem.slug(), indices: [faker.datatype.number(), faker.datatype.number()] },
      ],
    },
    user: {
      id: faker.datatype.number(),
      screen_name: faker.name.firstName(),
    },
  };
}

function buildPhotoData() {
  const base = buildTextOnlyData();
  const medium = {
    id: faker.datatype.number(),
    id_str: faker.datatype.number().toString(),
    media_url: SampleData.imageURLStr(),
    type: 'photo',
    source_user_id: faker.datatype.number(),
    source_user_id_str: faker.datatype.number().toString(),
  };

  base['entities']['media'] = [medium, medium];

  return base;
}
