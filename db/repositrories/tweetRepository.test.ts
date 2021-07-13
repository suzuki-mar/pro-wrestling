import { TweetType } from 'integrations/twitter/interface';
import { IPromoter } from 'app/core/wreslter';
import { SampleData } from 'sampleData';
import * as _ from 'lodash';
import { RepositoryFactory } from './repositoryFactory';
import { TweetRepository } from './tweetRepository';
import { TWrestlerName } from 'app/core/wreslter';
import { ClientFactory } from 'integrations/clientFactory';

describe('TweetRepository', () => {
  const repository = new TweetRepository();
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

    describe.skip('実際のAPIにつなげる処理 必要になるとき以外Skipするs', () => {
      beforeEach(() => {
        ClientFactory.connectingToExternalAPI();
      });

      afterEach(() => {
        ClientFactory.resetStatus();
      });

      it('写真付きTweetが返されていること', async () => {
        const tweets = await repository.fetchPictureTweetByWrestlerNames(names, promoters);
        let success = false;

        names.forEach((n: TWrestlerName) => {
          _.each(tweets[0]!.hashtags, (hashtag) => {
            if (n.full === hashtag) {
              success = true;
            }
          });

          expect(success).toEqual(true);
        });
      });
    });
  });

  describe('createParams', () => {
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
