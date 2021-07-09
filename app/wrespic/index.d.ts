import { IWrestler, IWrestlerName, IPromoter } from 'app/core/wreslter';
import { TPictureTweet } from 'integrations/twitter/interface';

export interface IFavoriteWrestlers {
  build(): Promise<void>;
  wrestlers(): IWrestler[];
  names(): IWrestlerName[];
  sortById(): void;
}

export interface ISelectedWrestlers {
  searchFromTwitter(): Promise<void>;
  pictureUrls(): TSource[];
  names(): IWrestlerName[];
  selectWreslerName(name: IWrestlerName): IWrestlerName[];
}

export interface IAlbumCollection {
  buildFromSources(pictureURLs: TSource[]): void;
  albums(): IAlbum[];
  currentDisplayAlbum(): IAlbum;
  prepareDownload(): Promise<void>;
  changeCurrentDisplayAlbum(name: IWrestlerName): void;
}

export interface IAlbum {
  readonly wrestlerName: IWrestlerName;
  pictures(): TPicture[];
  count(): number;
}

export type TSource = {
  readonly name: IWrestlerName;
  readonly urlStr: string;
  readonly date: Date;
};

export type TPicture = {
  readonly urlStr: string;
  readonly wrestlerNames: IWrestlerName[];
  readonly date: Date;
  readonly fileName?: string;
};

export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(
    names: IWrestlerName[],
    poromoters: IPromoter[]
  ): Promise<TPictureTweet[]>;
}
