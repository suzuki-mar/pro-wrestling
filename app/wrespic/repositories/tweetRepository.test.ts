import { TweetType } from 'integrations/twitter';
import { IPromoter } from 'app/core/wreslter';
import { SampleData } from 'sampleData';
import { RepositoryFactory } from '../../../infrastructure/repositoryFactory';
import { TweetRepository } from './tweetRepository';
import { TwitterQuery } from 'integrations/twitter/twitterQuery';

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

  describe('createQuery', () => {
    it('名前のユニーク度が高いプロレスラーは団体名はついていないこと', () => {
      const name = SampleData.mioName();
      const query = repository.createQuery(name, promoters) as TwitterQuery;
      const expected = `#${name.full} has:hashtags -is:retweet`;
      expect(query.toQuery()).toMatch(expected);
    });

    // "(#Maria #Marvelouspro has:hashtags -is:retweet)

    it('名前のユニーク度が低いプロレスラーは団体名はついていこと', () => {
      const name = SampleData.mariaName();
      const query = repository.createQuery(name, promoters) as TwitterQuery;
      const expected = `#${name.full} #Marvelouspro has:hashtags -is:retweet`;
      expect(query.toQuery()).toMatch(expected);
    });
  });
});

export {};
