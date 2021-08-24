import { TUserID, TweetType } from 'integrations/twitter';
import { IPromoter } from 'app/wreslters';
import { SampleData } from 'sampleData';
import { RepositoryFactory } from '../../../../../infrastructure/repositoryFactory';
import { TweetRepository } from './tweetRepository';
import moment from 'moment';

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

  describe('fetchUserIDsThatFollowsRegularly', () => {
    it('フォローするユーザーIDを取得すること', async () => {
      const userIDs = await repository.fetchUserIDsThatFollowsRegularly();

      const expected: TUserID[] = [{ name: 'Mio0207415' }, { name: 'mei_marvelous' }];

      expect(userIDs).toEqual(expected);
    });
  });

  describe('fetchOnlyTweetsFromSinceTimeByUserIds', () => {
    it('指定した期間以降の指定したユーザーのツイートを取得すること', async () => {
      const userIDs = [{ name: 'Mio0207415' }, { name: 'mei_marvelous' }];
      const since = moment().add(-5, 'day').toDate();

      const tweets = await repository.fetchOnlyTweetsFromSinceTimeByUserIds(since, userIDs);
      expect(tweets.length).toBeGreaterThan(1);
    });
  });

  describe('createQuery', () => {
    it('名前のユニーク度が高いプロレスラーは団体名はついていないこと', () => {
      const name = SampleData.mioName();
      const query = repository.createQuery(name, promoters);
      const expected = `#${name.full} has:hashtags -is:retweet`;
      expect(query.toQuery()).toMatch(expected);
    });

    // "(#Maria #Marvelouspro has:hashtags -is:retweet)

    it('名前のユニーク度が低いプロレスラーは団体名はついていこと', () => {
      const name = SampleData.mariaName();
      const query = repository.createQuery(name, promoters);
      const expected = `#${name.full} #Marvelouspro has:hashtags -is:retweet`;
      expect(query.toQuery()).toMatch(expected);
    });
  });
});

export {};
