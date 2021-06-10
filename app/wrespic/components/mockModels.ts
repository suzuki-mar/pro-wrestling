import { IListener, IExecutionLog, DownloadStatus } from './interface';
import * as _ from 'lodash';

export class MockExecutionLog implements IExecutionLog {
  readonly listeners: IListener[] = [];
  private _isAllDownloadComplete = false;
  private _statuses: DownloadStatus[] = [];

  addProcessListener(listener: IListener): void {
    this.listeners.push(listener);
  }

  notifyDownloadStatus(status: DownloadStatus): void {
    this._statuses.push(status);
  }

  notifyAllDownloadSuccesses(): void {
    this._isAllDownloadComplete = _.every(this._statuses, (status) => {
      return status.success;
    });
  }

  isAllDownloadComplete(): boolean {
    return this._isAllDownloadComplete;
  }
}
