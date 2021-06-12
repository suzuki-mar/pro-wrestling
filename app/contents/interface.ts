import { IWrestler } from '../sub_contexts/wreslter/interface';

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
  readonly performingWrestlers: IWrestler[];
}

export interface IContentsRepository {
  excludeSavedSourceIds(targetSourceIds: ISourceId[]): ISourceId[];
  saveContents(contents: IContent[]): Boolean;
}
