import { Client as TwitterClient } from 'integrations/twitter/client';
import { ITwitterParams, TTweet, ITwitter, ITwitterQuery } from 'integrations/twitter';
import { SampleData } from 'sampleData';
import { TwitterID } from 'integrations/twitter/twitterID';

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
    async search(arg: ITwitterQuery | TwitterID[], params: ITwitterParams): Promise<TTweet[]> {
      return SampleData.tweets();
    }

    async multisearch(
      args: (ITwitterQuery | TwitterID[])[],
      params: ITwitterParams
    ): Promise<TTweet[]> {
      return await this.search(args[0]!, params);
    }
  };
}
