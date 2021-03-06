import { TwitterID } from './twitterID';

export const REQUEST_MAX_COUNT = 100;

export type TTweetContributor = {
  number: number;
  identificationName: string;
  displayName: string;
};

export type TTweetBaseURL = {
  urlStr: string;
};

export type TTweetPictureURL = TTweetBaseURL & {};

export type TTweetSiteURL = TTweetBaseURL & {
  description: string;
  title: string;
};

export type TTweetURL = TTweetPictureURL | TTweetSiteURL;

export type TTweetBase = {
  id: TTwitterID;
  text: string;
  type: TweetType;
  hashtags?: string[];
  tweeted_at: Date;
  contributor: TTweetContributor;
  urls: TTweetURL[];
};

export type TTextOnlyTweet = TTweetBase;

export type TPictureTweetResizedURL = {
  type: TPictureSizeType;
  src: string;
};

export const TPictureSizeTypes = {
  Thumb: 'thumb',
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
} as const;

export type TPictureSizeType = typeof TPictureSizeTypes[keyof typeof TPictureSizeTypes];

export const TSearchTypes = {
  Hashtag: 'hashtag',
  IdList: 'idList',
} as const;

export type TSearchType = typeof TSearchTypes[keyof typeof TSearchTypes];

export type TPictureTweetItem = {
  pictureResizedURLs: TPictureTweetResizedURL[];
  pictureOriginalURL: string;
  pictureNumber: Number;
};
export type TPictureTweet = TTweetBase & { items: TPictureTweetItem[] };
export type TTweet = TPictureTweet | TTextOnlyTweet;

export enum TweetType {
  TextOnly = 'TextOnly',
  Picture = 'Picture',
  Unknown = 'Unknown',
}

export enum TwitterMediaType {
  IMAGES = 'images',
  VIDEOS = 'videos',
  UNSPECIFED_TYPE = '',
}

export interface ITwitter {
  search(query: ITwitterQuery, params: ITwitterParams): Promise<TTweet[]>;
  search(idList: TTwitterID[], params: ITwitterParams): Promise<TTweet[]>;
  multisearch(args: (ITwitterQuery | TwitterID[])[], params: ITwitterParams): Promise<TTweet[]>;
}

export interface ITwitterQuery {
  setMediaType(type: TwitterMediaType): ITwitterQuery;
  setIncldueRT(): ITwitterQuery;
  toQuery(): string;
}

export interface ITwitterHashtagQuery extends ITwitterQuery {
  hashtags(): string[];
  addHashtag(tag: string): ITwitterHashtagQuery;
}

export interface ITwitterUserIDQuery extends ITwitterQuery {
  addUserID(userID: TUserID): ITwitterUserIDQuery;
}

export interface ITwitterParams {
  count(): Number;
  setMediaType(type: TwitterMediaType): ITwitterParams;
  setCountMax(): ITwitterParams;
  setCount(count: Number): ITwitterParams;
  mediaType(): TwitterMediaType;
  setStartTime(date: Date): ITwitterParams;
}

export type TTwitterID = {
  numeric: BigInt;
  value: string;
  equal(compare: TTwitterID): boolean;
};

export type TUserID = {
  name: string;
};
