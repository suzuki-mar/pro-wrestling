import { IWrestler } from 'app/sub_contexts/wreslter/interface';
import { IPhoto } from 'app/wrespic/interface';

export interface IFavoriteWrestlers {
  wrestlers(): Promise<IWrestler[]>;
}

export interface IAlbum {
  uploads(uploadPhotos: IPhoto[], log: IExecutionLog): Promise<IExecutionLog>;
}

export interface IExecutionLog {
  isAllDownloadComplete(): boolean;

  addProcessListener(listener: IListener): void;
  notifyUploadedPhoto(photo: IPhoto): void;
  notifyAllUploaded(alumb: IAlbum): void;
}

export interface IListener {
  update(photo: IPhoto): void;
  updateAllFinsh(albmu: IAlbum): void;
}
