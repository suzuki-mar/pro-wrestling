import { TweetType, TPictureTweet } from '.';
import faker from 'faker';
import { TweetBuilder } from './tweetBuilder';
import { SampleData } from 'sampleData';
import { SearchResponseItem } from './searchExecutors/type.d';
import { TwitterID } from './twitterID';

describe('TweetBuilder', () => {
  describe('TextのTweet', () => {
    it('TextOnlyを作成すること', async () => {
      const item = buildTextOnlyItem();
      const tweet = TweetBuilder.build(item);

      expect(tweet.type).toEqual(TweetType.TextOnly);
      expect(tweet.text).not.toBeUndefined();
      expect(tweet.id).not.toBeUndefined();
      expect(tweet.hashtags).not.toBeUndefined();
      expect(tweet.contributor.identificationName).not.toBeUndefined();
      expect(tweet.tweeted_at.toDateString()).toEqual('Sun Jun 20 2021');
    });
  });

  describe('写真付きのTweet', () => {
    it('Pictureを作成すること', async () => {
      const item = buildPictureItem();
      const tweet = TweetBuilder.build(item) as TPictureTweet;
      expect(tweet.type).toEqual(TweetType.Picture);
      expect(tweet.items).not.toBeUndefined();

      const pictureItem = tweet.items[0]!;
      expect(pictureItem.pictureResizedURLs[0]!.src).not.toBeUndefined();
      expect(pictureItem.pictureOriginalURL).not.toBeUndefined();
    });
  });
});

function buildTextOnlyItem(): SearchResponseItem {
  return {
    tweeted_at: new Date('Sun Jun 20 2021'),
    id: TwitterID.build(faker.datatype.number().toString()),
    text: faker.lorem.text(),
    hashtags: [faker.lorem.slug()],
    contributor: {
      id: faker.datatype.number(),
      name: faker.name.firstName() + '_name',
      username: faker.name.firstName() + '_screen',
    },
  };
}

function buildPictureItem(): SearchResponseItem {
  const base = buildTextOnlyItem();
  base['photoURLs'] = [{ id: faker.datatype.number(), url: SampleData.imageURLStr() }];
  return base;
}
