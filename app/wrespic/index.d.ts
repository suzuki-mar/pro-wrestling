import { TWrestlerName, IPromoter } from 'app/core/wreslter';
import { TPictureTweet } from 'integrations/twitter';

export interface ISelectedWrestlers {
  names(): TWrestlerName[];
  isSelected(name: TWrestlerName): boolean;
  select(name: TWrestlerName): TWrestlerName[];
  deselect(name: TWrestlerName): TWrestlerName[];
  rebuild(names: TWrestlerName[]): void;
}

export interface ISourceCollection {
  rebuild(sources: TSource[]): void;
  filterFromSelected(targetNames: TWrestlerName[]): TSource[];
  load(names: TWrestlerName[]): Promise<void>;
  sources(): TSource[];
}

export interface IAlbumCollection {
  buildFromSources(pictureURLs: TSource[]): void;
  albums(): IAlbum[];
  currentDisplayAlbum(): IAlbum;
  prepareDownload(): Promise<void>;
  changeCurrentDisplayAlbum(name: TWrestlerName): void;
  albumNames(): string[];
}

export interface IAlbum {
  readonly wrestlerName: TWrestlerName;
  pictures(): TPicture[];
  count(): number;
}

export type TSource = {
  readonly name: TWrestlerName;
  readonly imageURL: TImageURL;
  readonly date: Date;
  readonly contributor: string;
};

export type TImageURL = {
  readonly original: string;
};

export type TPicture = {
  readonly source: TSource;
  readonly wrestlerNames: TWrestlerName[];
  readonly fileName?: string;
  originalImageURL(): string;
  isRelated(name: TWrestlerName): boolean;
  displayName(): strng;
};

export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(
    names: TWrestlerName[],
    poromoters: IPromoter[]
  ): Promise<TPictureTweet[]>;
}
