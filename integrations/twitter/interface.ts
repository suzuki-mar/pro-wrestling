import { TwitterParams } from 'integrations/twitter/params';

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
  UNFILTERED = 'unfiltered',
}

export type Tweet = {
  id: Number;
  text: string;
  photoURL?: URL;
};

export interface ITwitter {
  search(params: TwitterParams): Promise<Tweet[]>;
}

export interface ITwitterParams {
  toHash(): { [key: string]: string };
  reset(): void;
  initializeHashtaGroup(tag: string): ITwitterParams;
  addHashTag(tag: string, operator: TwitterQueryOperator): TwitterParams;
  addFilter(filter: TwitterFiliter): ITwitterParams;
}
