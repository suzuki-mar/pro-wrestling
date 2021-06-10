import { IWrestler } from '../../sub_contexts/wreslter/interface';

export interface IFavoriteWrestlers {
  wrestlers(): Promise<IWrestler[]>;
}

export interface IAlbum {
  downloads(wrestlers: IWrestler[], log: IExecutionLog): Promise<IExecutionLog>;
}

export type DownloadStatus = {
  success: boolean;
  wresler: IWrestler;
};

export interface IExecutionLog {
  addProcessListener(listener: IListener): void;
  notifyDownloadStatus(status: DownloadStatus): void;
  notifyAllDownloadSuccesses(): void;
  isAllDownloadComplete(): boolean;
}

export interface IListener {
  update(status: DownloadStatus): void;
  updateAllFinsh(status: DownloadStatus): void;
}
