import { IWrestler, TWrestlerName, IPromoter, WrestlerParam } from 'app/core/wreslter';
import { TPictureTweet } from 'integrations/twitter/interface';

export interface IFavoriteWrestlers {
  build(): Promise<void>;
  wrestlers(): IWrestler[];
  names(): TWrestlerName[];
  sortById(): void;
  rebuild(params: WrestlerParam[]): void;
}

export interface ISelectedWrestlers {
  filterFromSelected(): TSource[];
  searchFromTwitter(): Promise<void>;
  sources(): TSource[];
  names(): TWrestlerName[];
  isSelected(name: TWrestlerName): boolean;
  select(name: TWrestlerName): TWrestlerName[];
  deselect(name: TWrestlerName): TWrestlerName[];
  rebuild(names: TWrestlerName[], sources: TSource[]): void;
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
  readonly urlStr: string;
  readonly date: Date;
};

export type TPicture = {
  readonly urlStr: string;
  readonly wrestlerNames: TWrestlerName[];
  readonly date: Date;
  readonly fileName?: string;
};

export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(
    names: TWrestlerName[],
    poromoters: IPromoter[]
  ): Promise<TPictureTweet[]>;
}
