import { TweetType } from 'integrations/twitter';
import { IPromoter } from 'app/core/wreslter';
import { SampleData } from 'sampleData';
import { RepositoryFactory } from '../../../infrastructure/repositoryFactory';
import { TweetRepository } from './tweetRepository';

const repository = new TweetRepository();
describe('TweetRepository', () => {
  const names = SampleData.wrestlerNames();
  let promoters: IPromoter[];

  beforeEach(async () => {
    promoters = await RepositoryFactory.factoryPromoterRepository().featchAll();
  });

  describe('fetchPictureByWrelsers', () => {
    it('写真付きTweetが返されていること', async () => {
      const tweets = await repository.fetchPictureTweetByWrestlerNames(names, promoters);

      const anoterType = tweets.find((tweet) => {
        return tweet.type !== TweetType.Picture;
      });

      expect(anoterType).toBeUndefined();
    });
  });

  describe('createParams', () => {
    it('名前のユニーク度が高いプロレスラーは団体名はついていないこと', () => {
      const name = SampleData.mioName();
      const params = repository.createSearchParams(name, promoters);
      // const expected = `(#${name.full} AND #Marvelouspro) filter:images -filter:retweets`;
      const expected = `(#${name.full}) filter:images -filter:retweets`;
      expect(params.toQuery()).toEqual(expected);
    });

    it('名前のユニーク度が低いプロレスラーは団体名はついていること', () => {
      const name = SampleData.mariaName();
      const params = repository.createSearchParams(name, promoters);
      const expected = `(#${name.full} AND #Marvelouspro) filter:images -filter:retweets`;
      expect(params.toQuery()).toEqual(expected);
    });
  });
});

export {};
