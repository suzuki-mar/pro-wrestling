import { TweetType } from 'integrations/twitter';
import { IPromoter } from 'app/core/wreslter';
import { SampleData } from 'sampleData';
import { RepositoryFactory } from './repositoryFactory';
import { TweetRepository } from './tweetRepository';

describe('TweetRepository', () => {
  const repository = new TweetRepository();
  const names = SampleData.wrestlerNames();
  let promoters: IPromoter[];

  beforeEach(async () => {
    promoters = await RepositoryFactory.factoryPromoterRepository().featchAll();
  });

  describe('fetchPictureByWrelsers', () => {
    it.skip('写真付きTweetが返されていること', async () => {
      const tweets = await repository.fetchPictureTweetByWrestlerNames(names, promoters);

      const anoterType = tweets.find((tweet) => {
        return tweet.type !== TweetType.Picture;
      });

      expect(anoterType).toBeUndefined();
    });
  });

  describe.skip('createParams', () => {
    const names = [SampleData.wrestlerName(), SampleData.wrestlerName()];

    it('パラメーターが作成できていること', () => {
      const params = TweetRepository.SearchParamsCreator.createParams(names, promoters);
      const expected = `(#${names[0]!.full} AND #Marvelouspro) OR (#${
        names[1]!.full
      } AND #Marvelouspro) filter:images -filter:retweets`;
      expect(params.toQuery()).toEqual(expected);
    });
  });
});

export {};
