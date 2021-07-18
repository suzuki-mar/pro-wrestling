import { TWrestlerName, IPromoter } from 'app/core/wreslter';
import { TPictureTweet } from 'integrations/twitter/interface';

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
};

export type TImageURL = {
  readonly original: string;
};

export type TPicture = {
  readonly imageURL: TImageURL;
  readonly wrestlerNames: TWrestlerName[];
  readonly date: Date;
  readonly fileName?: string;
  originalImageURL(): string;
  isRelated(name: TWrestlerName): boolean;
};

export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(
    names: TWrestlerName[],
    poromoters: IPromoter[]
  ): Promise<TPictureTweet[]>;
}
