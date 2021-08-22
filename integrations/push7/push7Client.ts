import { TNotificationData, INotifyer, TNotifcationLog } from 'infrastructure/notification';
import axios, { AxiosInstance } from 'axios';

export class Push7Client implements INotifyer {
  private static APP_NUMBER = process.env.PUSH7_APP_NUMBER;
  private static API_KEY = process.env.PUSH7_API_KEY;

  async sendPush(data: TNotificationData): Promise<TNotifcationLog> {
    const client = this.buildHTTPClient();

    return client
      .post(`${Push7Client.APP_NUMBER}/send`, this.buildSendParams(data))
      .then(function (response) {
        return {
          success: true,
          sendingTime: new Date(),
          data: data,
        };
      });
  }

  private buildHTTPClient(): AxiosInstance {
    const instance = axios.create({
      baseURL: 'https://api.push7.jp/api/v1',
    });

    instance.defaults.headers.common['Authorization'] = `Bearer ${Push7Client.API_KEY}`;
    return instance;
  }

  private buildSendParams(data: TNotificationData): {} {
    return {
      title: data.title,
      body: data.message,
      icon: 'https://push7.jp/notifycation_icon.png',
      url: data.urlStr,
      apikey: Push7Client.API_KEY,
      disappear_instantly: false,
    };
  }
}
