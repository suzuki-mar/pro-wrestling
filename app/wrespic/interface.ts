import { IWrestler } from 'app/core/wreslter/interface';

export type TPhoto = {
  wresler: IWrestler;
  url: URL;
  file?: File;
};

export interface IPhoto extends TPhoto {
  processStatus: ProcessStatus;
}

export enum ProcessStatus {
  InitialState = 0,
  DownloadComplete = 1,
  ResourceNotFound = 2,
  UploadComplete = 3,
  UploadFailed = 4,
}
