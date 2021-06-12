import { IListener, IExecutionLog, IAlbum } from './components/interface';
import * as _ from 'lodash';
import { IPhoto, ProcessStatus } from './interface';
import { IWrestler } from '../sub_contexts/wreslter/interface';

export class MockPhoto implements IPhoto {
  readonly file = undefined;
  readonly processStatus = ProcessStatus.InitialState;

  constructor(readonly wresler: IWrestler, readonly url: URL) {}
}

export class MockExecutionLog implements IExecutionLog {
  readonly listeners: IListener[] = [];
  private _isAllDownloadComplete = false;

  addProcessListener(listener: IListener): void {
    this.listeners.push(listener);
  }

  notifyUploadedPhoto(photo: IPhoto): void {
    _.each(this.listeners, (listener) => {
      listener.update(photo);
    });
  }

  notifyAllUploaded(album: IAlbum): void {
    _.each(this.listeners, (listener) => {
      listener.updateAllFinsh(album);
    });

    this._isAllDownloadComplete = true;
  }

  isAllDownloadComplete(): boolean {
    return this._isAllDownloadComplete;
  }
}
