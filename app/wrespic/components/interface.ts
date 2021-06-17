import { IWrestler, WrestlerName } from 'app/core/wreslter/interface';

export interface IFavoriteWrestlers {
  load(): Promise<void>;
  wrestlers(): IWrestler[];
}

export interface IAlbum {
  searchPhotos(photoURLs: WrestlerPictureURL[]): Promise<IPhoto[]>;
  downloadedPhotos(): IPhoto[];
  isAllDownloadComplete(): boolean;
}

export type WrestlerPictureURL = {
  name: WrestlerName;
  url: URL;
};

export interface IPhoto {
  readonly pictureURL: WrestlerPictureURL;
  // Fileだと実装が大変なため一旦Stringｓにしている
  readonly file: string;
  fixFileName(): void;
}
