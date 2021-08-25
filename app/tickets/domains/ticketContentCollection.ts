import { ExternalServiceClientFactory } from 'infrastructure/externalServiceClientFactoryclientFactory';
import { TNotifcationLog } from 'infrastructure/notification';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import moment from 'moment';
import { ITicketContentCollection, TTicketContent } from '..';
import { TicketContentFactory } from './ticketContentFactory';

export class TicketContentCollection implements ITicketContentCollection {
  private _tickets: TTicketContent[] = [];

  async loadRecentlyCreatedRinsaiTicketIfCreated(): Promise<void> {
    const tweetRepository = RepositoryFactory.factoryTweetRepository();
    const tweetUserIDs = await tweetRepository.fetchUserIDsThatFollowsRegularly();

    const sinceDate = moment().add(-15, 'seconds').toDate();

    const tweets = await tweetRepository.fetchOnlyTweetsFromSinceTimeByUserIds(
      sinceDate,
      tweetUserIDs
    );

    const factory = new TicketContentFactory();
    this._tickets = this._tickets.concat(factory.buildsFromTweets(tweets, 'rinsai'));
  }

  async notifyOfLoadedTicketContents(): Promise<TNotifcationLog[]> {
    const notifier = ExternalServiceClientFactory.factoryPushNotificationClient();

    const promiess = this._tickets.map((t) => notifier.sendPush(t));

    let logs: TNotifcationLog[] = [];
    await Promise.all(promiess).then((values) => {
      let _logs = values as TNotifcationLog[];
      logs = logs.concat(_logs);
    });

    return logs;
  }

  tickets(): TTicketContent[] {
    return this._tickets;
  }
}
