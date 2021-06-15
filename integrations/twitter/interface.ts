import { TwitterParams } from 'integrations/twitter/params';
import { TTweet } from 'app/sub_contexts/tweet';

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

export interface ITwitter {
  search(params: TwitterParams): Promise<TTweet[]>;
}

export interface ITwitterParams {
  toHash(): { [key: string]: string };
  reset(): void;
  initializeHashtaGroup(tag: string): ITwitterParams;
  addHashTag(tag: string, operator: TwitterQueryOperator): TwitterParams;
  addFilter(filter: TwitterFiliter): ITwitterParams;
}
