export type TNotificationData = {
  title: string;
  message: string;
  urlStr: string;
};

export type TNotifcationLog = {
  success: boolean;
  sendingTime: Date;
  data: TNotificationData;
};

export interface INotifyer {
  sendPush(data: TNotificationData): Promise<TNotifcationLog>;
}
