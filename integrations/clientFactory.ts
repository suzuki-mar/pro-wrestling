import { Client as TwitterClient } from 'integrations/twitter/client';
import {
  ITwitterParams,
  TTextOnlyTweet,
  TTweet,
  TPictureTweet,
  TweetType,
  ITwitter,
} from 'integrations/twitter/interface';
import faker from 'faker';
import { SampleData } from 'db/sampleData';

export class ClientFactory {
  private static _isConnectingToExternalAPI = false;

  static connectingToExternalAPI(): void {
    this._isConnectingToExternalAPI = true;
  }

  static resetStatus(): void {
    this._isConnectingToExternalAPI = false;
  }

  static factoryTwitterClient(): ITwitter {
    return this._isConnectingToExternalAPI ? new TwitterClient() : new this.MockTwitterClient();
  }

  public static MockTwitterClient = class {
    async search(params: ITwitterParams): Promise<TTweet[]> {
      // 上位レイヤーのテストのため実際のレスラー名を使用する
      const wreslerNames = SampleData.wrestlerNames();

      const textOnly: TTextOnlyTweet = {
        id: faker.datatype.number(),
        text: faker.lorem.text(),
        type: TweetType.TextOnly,
        hashtags: [faker.lorem.slug(), wreslerNames[0]!.full, wreslerNames[1]!.full],
      };

      const picture: TPictureTweet = {
        id: faker.datatype.number(),
        text: faker.lorem.text(),
        pictureURL: faker.image.imageUrl(),
        hashtags: [faker.lorem.slug(), wreslerNames[0]!.full],
        type: TweetType.Picture,
      };
      return [textOnly, picture];
    }
  };
}
