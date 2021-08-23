import { TNotificationData } from 'infrastructure/notification';
import { Push7Client } from 'integrations/push7/push7Client';

describe('Push7Client Push通知が送信されてしまうので本当に必要なとき以外はSKIP', () => {
  describe('sendPush', () => {
    it('Push通知ができること', async () => {
      const data: TNotificationData = {
        title: '桃野美桜 オンラインリンサイ',
        message: '8/12桃野美桜　オンラインリングサイド',
        urlStr: 'https://passmarket.yahoo.co.jp/event/show/detail/01pxc3zdqmu11.html',
      };

      const client = new Push7Client();
      await client.sendPush(data);
    });
  });
});
