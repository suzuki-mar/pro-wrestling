import { TNotificationData } from 'infrastructure/notification';
import { IStreamingFilter } from 'infrastructure/stremings';

export interface IJudgeTicketContent extends IStreamingFilter {}

export interface ITicketContent extends TNotificationData {}
