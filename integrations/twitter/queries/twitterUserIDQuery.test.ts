import { TwitterUserIDQuery } from 'integrations/twitter/queries/twitterUserIDQuery';
import { TUserID } from '..';
import faker from 'faker';

describe('toQuery', () => {
  let query: TwitterUserIDQuery;
  let userIDs: TUserID[] = [{ name: faker.name.firstName() }, { name: faker.name.firstName() }];

  beforeEach(() => {
    query = new TwitterUserIDQuery(userIDs[0]!);
  });

  describe('ユーザーIDのの設定', () => {
    it('検索できていること', () => {
      query.addUserID(userIDs[1]!);
      query.setIncldueRT();
      expect(query.toQuery()).toMatch(`from:${userIDs[0]!.name} OR from:${userIDs[1]!.name}`);
    });
  });
});

export {};
