import { IWrestler } from 'app/core/wreslter';

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
