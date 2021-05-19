import { Wrestler } from '../wresler/interface';

export interface SourceId {
  readonly id: string;
}

// TODO　Sourceをどこのコンテキストからも使用できるシンプルなクラスにする
export interface Source {
  readonly sourceId: SourceId;
  readonly title: string;
  readonly thumbnailURL: URL;
  readonly sourceURL: URL;
  readonly publicationDate: Date;
}

export interface Content {
  readonly source: Source;
  readonly performingWrestlers: Wrestler[];
}

export interface ContentsRepository {
  excludeSavedSourceIds(targetSourceIds: SourceId[]): SourceId[];
  saveContents(contents: Content[]): Boolean;
}

export interface Searcher {
  searchByWreslersFromTwitter(wreslers: Wrestler[]): Content[];
}
