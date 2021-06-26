import { IWrestler, IWrestlerName, IPromoter } from 'app/core/wreslter';
import { TPictureTweet } from 'integrations/twitter/interface';

export interface IFavoriteWrestlers {
  load(): Promise<void>;
  wrestlers(): IWrestler[];
}

export interface ISelectedWrestlers {
  searchFromTwitter(): Promise<void>;
  pictureUrls(): TWrestlerPictureURL[];
  names(): IWrestlerName[];
  selectWreslerName(name: IWrestlerName): IWrestlerName[];
}

export interface IAlbum {
  readonly uploadedID?: Number;

  setUpPictures(pictureURLs: TWrestlerPictureURL[]): void;
  pictures(): TPicture[];
  prepareDownload(): Promise<void>;
}

export type TWrestlerPictureURL = {
  readonly name: IWrestlerName;
  readonly urlStr: string;
  readonly date: Date;
};

export type TPicture = {
  readonly urlStr: string;
  readonly wrestlerNames: IWrestlerName[];
  readonly date: Date;
  fileName?: string;
};

export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(
    names: IWrestlerName[],
    poromoters: IPromoter[]
  ): Promise<TPictureTweet[]>;
}
