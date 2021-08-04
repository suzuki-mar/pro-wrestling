import { ApiV2Includes, TweetV2 } from 'twitter-api-v2';

import { IncludeItemController } from './interface';
import * as _ from 'loadsh';

export class ContributorController implements IncludeItemController {
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
