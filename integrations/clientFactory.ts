import { Client as TwitterClient } from 'integrations/twitter/client';
import { ITwitterParams } from 'integrations/twitter/interface';
import { TTweet } from 'app/core/tweet';
import faker from 'faker';

export class ClientFactory {
  private static _isConnectingToExternalAPI = false;

  static connectingToExternalAPI(): void {
    this._isConnectingToExternalAPI = true;
  }

  static resetStatus(): void {
    this._isConnectingToExternalAPI = false;
  }

  static factoryTwitterClient(): TwitterClient {
    return this._isConnectingToExternalAPI ? new TwitterClient() : new this.MockTwitterClient();
  }

  public static MockTwitterClient = class extends TwitterClient {
    async search(params: ITwitterParams): Promise<TTweet[]> {
      const tweets: TTweet[] = [
        { id: 1, text: 'aaa' },
        { id: 2, text: 'aaa', photoURL: new URL(faker.image.imageUrl()) },
      ];
      return tweets;
    }
  };
}
