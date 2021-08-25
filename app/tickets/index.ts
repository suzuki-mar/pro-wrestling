import { TNotifcationLog, TNotificationData } from 'infrastructure/notification';
import { IShortIntervalBatcheJob } from 'infrastructure/shortIntervalBatche';

export interface ISendTicketInfoJob extends IShortIntervalBatcheJob {}

export type TicketType = 'rinsai';

export interface TTicketContent extends TNotificationData {
  type: TicketType;
}

export interface ITicketContentCollection {
  loadRecentlyCreatedRinsaiTicketIfCreated(): Promise<void>;
  notifyOfLoadedTicketContents(): Promise<TNotifcationLog[]>;
}
