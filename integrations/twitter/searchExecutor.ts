import TwitterApi, { TweetV2, ApiV2Includes } from 'twitter-api-v2';
import { TTwitterID, TwitterMediaType, ITwitterQuery } from '.';
import { PictureURL } from './searchExecutors/includeItemController/pictureURL';
import { Contributor } from './searchExecutors/includeItemController/contributor';
import { SearchResponseItem } from './searchExecutors/type';
import { IncludeItem } from './searchExecutors/includeItemController/type';
import { TwitterParams } from './twitterParams';
import _ from 'lodash';
import { ItemCreator } from './searchExecutors/itemCreator';

export class SearchExecutor {
  private _includeItems: IncludeItem[];

  constructor(private _params: TwitterParams) {
    this._params = _params;
    this._includeItems = [];

    this._includeItems = [...this._includeItems, new Contributor()];

    if (this._params.mediaType() !== TwitterMediaType.UNSPECIFED_TYPE) {
      this._includeItems = [...this._includeItems, new PictureURL()];
    }
  }

  async executeFromQeuery(query: ITwitterQuery): Promise<SearchResponseItem[] | undefined> {
    const twitterClient = new TwitterApi(process.env.TWITTER_BEAR_TOKEN!);

    const searchFunction = async function (
      client: TwitterApi,
      params: TwitterParams
    ): Promise<[TweetV2[], ApiV2Includes]> {
      const result = await twitterClient.v2.search(query.toQuery(), params.toHash());
      return [result.tweets, result.includes!];
    };

    return await this.executeFromFunc(searchFunction);
  }

  async executeFromIds(ids: TTwitterID[]): Promise<SearchResponseItem[] | undefined> {
    const idValues = ids.map((id) => id.value);

    const searchFunction = async function (
      client: TwitterApi,
      params: TwitterParams
    ): Promise<[TweetV2[], ApiV2Includes]> {
      const result = await client.v2.tweets(idValues, params.toHash());
      return [result.data, result.includes!];
    };

    return await this.executeFromFunc(searchFunction);
  }

  private async executeFromFunc(func: Function): Promise<SearchResponseItem[] | undefined> {
    const twitterClient = new TwitterApi(process.env.TWITTER_BEAR_TOKEN!);
    const [tweets, includes] = await func(twitterClient, this._params);

    if (_.isEmpty(tweets)) {
      return undefined;
    }

    this._includeItems = this._includeItems.filter((controller) => {
      return controller.canUse(includes);
    });

    this._includeItems.forEach((itemController) => {
      itemController.setUpValues(includes);
    });

    const items = tweets.map((tweet: TweetV2) => ItemCreator.create(tweet, this._includeItems));
    return this.filterdItems(items);
  }

  private filterdItems(items: (SearchResponseItem | undefined)[]): SearchResponseItem[] {
    let filterdItems: SearchResponseItem[] = [];

    items.forEach((item) => {
      if (item !== undefined) {
        filterdItems = [...filterdItems, item];
      }
    });

    return filterdItems;
  }
}
