import { IWrestler, TWrestlerName } from 'app/core/wreslter/interface';

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
  readonly name: TWrestlerName;
  readonly url: URL;
};

export interface IPhoto {
  readonly pictureURL: TWrestlerPictureURL;
  file(): File;
  fixFileName(): void;
  downloadFile(): Promise<void>;
}
