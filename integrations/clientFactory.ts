import { Client as TwitterClient } from 'integrations/twitter/client';
import { ITwitterParams, TTweet, ITwitter } from 'integrations/twitter';
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
      return SampleData.tweets();
    }

    async multisearch(paramsList: ITwitterParams[]): Promise<TTweet[]> {
      return this.search(paramsList[0]!);
    }
  };
}
