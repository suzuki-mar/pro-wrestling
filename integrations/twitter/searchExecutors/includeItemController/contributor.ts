import { ApiV2Includes, TweetV2 } from 'twitter-api-v2';

import { IncludeItem } from './type';
import * as _ from 'loadsh';

export class Contributor implements IncludeItem {
  private _values = {};

  canUse(includes: ApiV2Includes): boolean {
    return true;
  }

  setUpValues(includes: ApiV2Includes) {
    includes.users!.forEach((user) => {
      return (this._values[user.id] = {
        id: user.id,
        name: user.name,
        username: user.username,
      });
    });
  }

  valid(tweet: TweetV2): boolean {
    return _.some(this._values, (_, key) => {
      return tweet.author_id === key;
    });
  }

  createIncludesDatas(tweet: TweetV2): {} {
    const contributor = _.find(this._values, (_, key) => {
      return tweet.author_id === key;
    });

    return { contributor: contributor };
  }
}
