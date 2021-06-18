import { IWrestler, TWrestlerName } from 'app/core/wreslter/interface';

export interface IFavoriteWrestlers {
  load(): Promise<void>;
  wrestlers(): IWrestler[];
}

export interface IAlbum {
  searchPhotos(photoURLs: TWrestlerPictureURL[]): Promise<IPhoto[]>;
  downloadedPhotos(): IPhoto[];
  isAllDownloadComplete(): boolean;
}

export type TWrestlerPictureURL = {
  name: TWrestlerName;
  url: URL;
};

export interface IPhoto {
  readonly pictureURL: TWrestlerPictureURL;
  // Fileだと実装が大変なため一旦Stringｓにしている
  readonly file: string;
  fixFileName(): void;
}
