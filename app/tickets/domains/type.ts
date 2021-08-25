import { TTextOnlyTweet, TUserID } from 'integrations/twitter';

export interface ITweetRepository {
  fetchOnlyTweetsFromSinceTimeByUserIds(since: Date, userIDs: TUserID[]): Promise<TTextOnlyTweet[]>;
  fetchUserIDsThatFollowsRegularly(): Promise<TUserID[]>;
}
