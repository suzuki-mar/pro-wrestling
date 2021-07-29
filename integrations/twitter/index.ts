export type TTweetBase = {
  id: Number;
  text: string;
  type: TweetType;
  hashtags: string[];
  tweeted_at: Date;
  contributor: string;
};

export type TTextOnlyTweet = TTweetBase;

export type TPictureTweetResizedURL = {
  type: TPictureSizeType;
  size: {
    height: number;
    width: number;
  };
  src: string;
};

export const TPictureSizeTypes = {
  Thumb: 'thumb',
  Large: 'large',
  Medium: 'medium',
  Small: 'small',
} as const;

export type TPictureSizeType = typeof TPictureSizeTypes[keyof typeof TPictureSizeTypes];

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

export enum TwitterQueryOperator {
  AND = 'AND',
  OR = 'OR',
}

export enum TwitterFiliter {
  IMAGES = 'images',
  // ツイッターの画像が含まれるツイート
  TWIMG = 'twimg',
  VIDEOS = 'videos',
  MEDIA = 'media',
  UNFILTERED = '',
}

export interface ITwitter {
  search(params: ITwitterParams): Promise<TTweet[]>;
  multisearch(paramsList: ITwitterParams[]): Promise<TTweet[]>;
}

export interface ITwitterParams {
  hashtags(): ITwitterHashtag[];
  toQuery(): string;
  filter(): TwitterFiliter;
  count(): Number;
  addHashTag(hashTag: ITwitterHashtag): ITwitterParams;
  addFilter(filter: TwitterFiliter): ITwitterParams;
  setCountMax(): ITwitterParams;
  addCount(count: Number): ITwitterParams;
  setIncldueRT(): ITwitterParams;
}

export interface ITwitterHashtag {
  toString(): string;
  addString(tag: string, operator: TwitterQueryOperator): ITwitterHashtag;
  initialize(tag: string): ITwitterHashtag;
}
