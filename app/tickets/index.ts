import { INotificationData } from 'infrastructure/notification';
import { IStreamingFilter } from 'infrastructure/stremings';

export interface IJudgeTicketContent extends IStreamingFilter {}

export interface ITicketContent extends INotificationData {}
