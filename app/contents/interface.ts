import { Wrestler } from '../wresler/interface';

export interface ISourceId {
  readonly id: string;
}

// TODO　Sourceをどこのコンテキストからも使用できるシンプルなクラスにする
export interface ISource {
  readonly sourceId: ISourceId;
  readonly title: string;
  readonly thumbnailURL: URL;
  readonly sourceURL: URL;
  readonly publicationDate: Date;
}

export interface IContent {
  readonly source: ISource;
  readonly performingWrestlers: Wrestler[];
}

export interface IContentsRepository {
  excludeSavedSourceIds(targetSourceIds: ISourceId[]): ISourceId[];
  saveContents(contents: IContent[]): Boolean;
}

export interface ISearcher {
  searchByWreslersFromTwitter(wreslers: Wrestler[]): IContent[];
}
