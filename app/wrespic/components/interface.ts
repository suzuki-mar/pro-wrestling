import { IWrestler, WrestlerName } from 'app/core/wreslter/interface';

export interface IFavoriteWrestlers {
  load(): Promise<void>;
  wrestlers(): IWrestler[];
}

export interface IAlbum {
  searchPhotos(photoURLs: TWrestlerPictureURL[]): Promise<void>;
  downloadPhotos(): Promise<void>;
  isAllDownloadComplete(): boolean;
  photos(): IPhoto[];
}

export type TWrestlerPictureURL = {
  readonly name: WrestlerName;
  readonly url: URL;
};

export interface IPhoto {
  readonly pictureURL: TWrestlerPictureURL;
  // Fileだと実装が大変なため一旦anyにしている
  readonly file: any;
  fixFileName(): void;
  downloadFile(): Promise<void>;
}
