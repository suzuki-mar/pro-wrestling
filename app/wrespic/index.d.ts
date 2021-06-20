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
  searchPhotos(photoURLs: TWrestlerPictureURL[]): Promise<void>;
  downloadPhotos(): Promise<void>;
  isAllDownloadComplete(): boolean;
  photos(): IPhoto[];
}

export type TWrestlerPictureURL = {
  readonly name: TWrestlerName;
  readonly urlStr: string;
};

export interface IPhoto {
  readonly pictureURL: TWrestlerPictureURL;
  file(): File;
  fixFileName(): void;
  downloadFile(): Promise<void>;
}

export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(
    wrestlers: IWrestler[],
    poromoters: IPromoter[]
  ): Promise<TPictureTweet[]>;
}
