import { IWrestler, TWrestlerName, IPromoter } from 'app/core/wreslter';
import { TPictureTweet } from 'integrations/twitter/interface';

export interface IFavoriteWrestlers {
  load(): Promise<void>;
  wrestlers(): IWrestler[];
}

export interface ISelectedWrestlers {
  searchFromTwitter(): Promise<void>;
  pictureUrls(): TWrestlerPictureURL[];
}

export interface IAlbum {
  setUpPictures(pictureURLs: TWrestlerPictureURL[]): void;
  pictures(): TPicture[];
  prepareDownload(): Promise<void>;
}

export type TWrestlerPictureURL = {
  readonly name: TWrestlerName;
  readonly urlStr: string;
};

export type TPicture = {
  readonly urlStr: string;
  readonly wrestlerNames: TWrestlerName[];
  file?: File;
};

export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(
    wrestlers: IWrestler[],
    poromoters: IPromoter[]
  ): Promise<TPictureTweet[]>;
}
