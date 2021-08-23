import { TNotificationData } from 'infrastructure/notification';
import { IShortIntervalBatcheJob } from 'infrastructure/shortIntervalBatche';

export interface ISendTicketInfoJob extends IShortIntervalBatcheJob {}

export interface ITicketContent extends TNotificationData {}
