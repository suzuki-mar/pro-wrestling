import TwitterApi, { TweetV2, ApiV2Includes } from 'twitter-api-v2';
import { TwitterQuery } from './twitterQuery';
import { TTwitterID, TwitterMediaType } from '.';
import { PictureURLController } from './searchExecutors/includeItemController/pictureURLController';
import { ContributorController } from './searchExecutors/includeItemController/contributorController';
import { IncludeItemController } from './searchExecutors/includeItemController/interface';
import { TwitterID } from './twitterID';
import { TwitterParams } from './twitterParams';
import _ from 'lodash';

export type SearchResponseItem = {
  // 桁大きすぎるためIntで扱うと値がおかしくなってしまうため
  id: TTwitterID;
  text: string;
  tweeted_at: Date;
  hashtags?: string[];
  contributor: { id: number; name: string; username: string };
  photoURLs?: { id: number; url: string }[];
};

export class SearchExecutor {
  private _includeItemControlelrs: IncludeItemController[];

  constructor(private _params: TwitterParams) {
    this._params = _params;
    this._includeItemControlelrs = [];

    this._includeItemControlelrs = [...this._includeItemControlelrs, new ContributorController()];

    if (this._params.mediaType() !== TwitterMediaType.UNSPECIFED_TYPE) {
      this._includeItemControlelrs = [...this._includeItemControlelrs, new PictureURLController()];
    }
  }

  async executeFromQeuery(query: TwitterQuery): Promise<SearchResponseItem[] | undefined> {
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

    this._includeItemControlelrs = this._includeItemControlelrs.filter((controller) => {
      return controller.canUse(includes);
    });

    this._includeItemControlelrs.forEach((itemController) => {
      itemController.setUpValues(includes);
    });

    const items = tweets.map((tweet: TweetV2) => this.createItem(tweet));
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

  private createItem(tweet: TweetV2): SearchResponseItem | undefined {
    const valid = this._includeItemControlelrs.every((itemController) => {
      return itemController.valid(tweet);
    });

    if (!valid) {
      return undefined;
    }

    let hashtags: string[] = [];
    const isRT = tweet.text.startsWith('RT');

    if (!isRT) {
      hashtags = tweet.entities!.hashtags.map((hashtag) => {
        return hashtag.tag;
      });
    }

    const tweetId: TTwitterID = TwitterID.build(tweet.id);

    let item = {
      id: tweetId,
      text: tweet.text,
      tweeted_at: new Date(tweet.created_at!),
      hashtags: hashtags,
    };

    this._includeItemControlelrs.forEach((itemController) => {
      const includeData = itemController.createIncludesDatas(tweet);
      item = Object.assign(item, includeData);
    });

    return item as SearchResponseItem;
  }
}
