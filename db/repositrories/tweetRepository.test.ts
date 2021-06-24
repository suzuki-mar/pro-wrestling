import { TweetType } from 'integrations/twitter/interface';
import { IPromoter } from 'app/core/wreslter';
import { SampleData } from 'sampleData';
import * as _ from 'lodash';
import { RepositoryFactory } from './repositoryFactory';
import { TweetRepository } from './tweetRepository';
import { Wrestler } from 'app/core/wreslter/wrestler';
import { ClientFactory } from 'integrations/clientFactory';

describe('TweetRepository', () => {
  const repository = new TweetRepository();
  const wrestlers = SampleData.wrestlers();
  let promoters: IPromoter[];

  beforeEach(async () => {
    promoters = await RepositoryFactory.factoryPromoterRepository().featchAll();
  });

  describe('fetchPictureByWrelsers', () => {
    it('写真付きTweetが返されていること', async () => {
      const tweets = await repository.fetchPictureTweetByWrestlerNames(wrestlers, promoters);

      const anoterType = _.find(tweets, (tweet) => {
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
        const tweets = await repository.fetchPictureTweetByWrestlerNames(wrestlers, promoters);
        let success = false;

        _.each(wrestlers, (w) => {
          _.each(tweets[0]!.hashtags, (hashtag) => {
            if (w.name.full === hashtag) {
              success = true;
            }
          });
        });

        expect(success).toEqual(true);
      });
    });
  });

  describe('createParams', () => {
    const names = SampleData.wrestlerNames().slice(1);
    const wrestlers = [new Wrestler(names[0]!), new Wrestler(names[1]!)];

    it('パラメーターが作成できていること', () => {
      const params = TweetRepository.SearchParamsCreator.createParams(wrestlers, promoters);
      const expected = `(#${names[0]!.full} AND #Marvelouspro) OR (#${
        names[1]!.full
      } AND #Marvelouspro) filter:images -filter:retweets`;
      expect(params.toQuery()).toEqual(expected);
    });
  });
});

export {};
