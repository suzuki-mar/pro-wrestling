import { Client as TwitterClient } from 'integrations/twitter/client';
import {
  ITwitterParams,
  TTextOnlyTweet,
  TTweet,
  TPictureTweet,
  TweetType,
  ITwitter,
} from 'integrations/twitter';
import faker from 'faker';
import { SampleData } from 'sampleData';

export class ClientFactory {
  private static _isConnectingToExternalAPI = process.env.NODE_ENV === 'test' ? false : true;

  static connectingToExternalAPI(): void {
    this._isConnectingToExternalAPI = true;
  }

  static resetStatus(): void {
    this._isConnectingToExternalAPI = false;
  }

  static isConnectingToExternalAPI(): boolean {
    return this._isConnectingToExternalAPI;
  }

  static setUpDefaultConnecting() {
    return false;
  }

  static factoryTwitterClient(): ITwitter {
    const result = this._isConnectingToExternalAPI
      ? new TwitterClient()
      : new this.MockTwitterClient();
    return result;
  }

  public static MockTwitterClient = class implements ITwitter {
    async search(params: ITwitterParams): Promise<TTweet[]> {
      // 上位レイヤーのテストのため実際のレスラー名を使用する
      const wreslerNames = SampleData.wrestlerNames();

      const textOnly: TTextOnlyTweet = {
        id: faker.datatype.number(),
        text: faker.lorem.text(),
        type: TweetType.TextOnly,
        hashtags: [faker.lorem.slug(), wreslerNames[0]!.full, wreslerNames[1]!.full],
        tweeted_at: faker.datatype.datetime(),
      };

      const picture: TPictureTweet = {
        id: faker.datatype.number(),
        text: faker.lorem.text(),
        pictureURL: SampleData.imageURLStr(),
        hashtags: [faker.lorem.slug(), wreslerNames[0]!.full],
        type: TweetType.Picture,
        tweeted_at: faker.datatype.datetime(),
      };
      return [textOnly, picture];
    }

    async multisearch(paramsList: ITwitterParams[]): Promise<TTweet[]> {
      return this.search(paramsList[0]!);
    }
  };

  async search(params: ITwitterParams): Promise<TTweet[]> {
    // 上位レイヤーのテストのため実際のレスラー名を使用する
    const wreslerNames = SampleData.wrestlerNames();

    const textOnly: TTextOnlyTweet = {
      id: faker.datatype.number(),
      text: faker.lorem.text(),
      type: TweetType.TextOnly,
      hashtags: [faker.lorem.slug(), wreslerNames[0]!.full, wreslerNames[1]!.full],
      tweeted_at: faker.datatype.datetime(),
    };

    const picture: TPictureTweet = {
      id: faker.datatype.number(),
      text: faker.lorem.text(),
      pictureURL: SampleData.imageURLStr(),
      hashtags: [faker.lorem.slug(), wreslerNames[0]!.full],
      type: TweetType.Picture,
      tweeted_at: faker.datatype.datetime(),
    };
    return [textOnly, picture];
  }
}
