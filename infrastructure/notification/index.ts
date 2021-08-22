export interface INotificationData {
  messageToSend(): string;
  id(): string;
}

export type TNotifcationLog = {
  success: boolean;
  sendingTime: Date;
  id: string;
};

export interface INotifyer {
  sendPush(data: INotificationData): TNotifcationLog;
}
