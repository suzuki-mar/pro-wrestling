import { TUserID, ITwitterUserIDQuery } from '..';
import { TwitterQuery } from './twitterQuery';

export class TwitterUserIDQuery extends TwitterQuery implements ITwitterUserIDQuery {
  private _userIDs: TUserID[];

  constructor(userID: TUserID) {
    super();
    this._userIDs = [userID];
  }

  buildQueryByType(): string {
    let strs: string[] = [];

    let idStr = '';
    this._userIDs.forEach((id) => {
      idStr = idStr + `from:${id.name} OR `;
    });
    idStr = idStr.slice(0, -4);
    strs = [...strs, idStr];

    return strs.join(' ');
  }

  addUserID(userID: TUserID): ITwitterUserIDQuery {
    this._userIDs = [...this._userIDs, userID];
    return this;
  }
}
