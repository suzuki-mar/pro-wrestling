import {
  IFavoriteWrestlers,
  IWrestler,
  IAlbum,
  IExecutionLog,
  DownloadStatus,
  IListener,
} from "./interface"
import * as _ from "lodash"
import { sleep } from "../../../test/lib"

export class MockFavoriteWrestlers implements IFavoriteWrestlers {
  wrestlers(): IWrestler[] {
    const names = ["桃野美桜", "門倉凛", "神童ミコト", "星月芽依", "Maria", "宝山愛"]

    return _.map(names, (name) => {
      return new MockWrestler(name)
    })
  }
}

export class MockWrestler implements IWrestler {
  constructor(private readonly _name: string) {}

  name(): string {
    return this._name
  }
}

export class MockAlbum implements IAlbum {
  async downloads(wrestlers: IFavoriteWrestlers, log: IExecutionLog): Promise<IExecutionLog> {
    const promises = _.map(wrestlers.wrestlers(), (wresler) => {
      const status: DownloadStatus = { success: true, wresler: wresler }
      return sleep(() => {
        log.notifyDownloadStatus(status)
      })
    })

    await Promise.all(promises).then((results) => {
      log.notifyAllDownloadSuccesses()
    })

    return log
  }
}

export class MockExecutionLog implements IExecutionLog {
  readonly listeners: IListener[] = []
  private _isAllDownloadComplete = false
  private _statuses: DownloadStatus[] = []

  addProcessListener(listener: IListener): void {
    this.listeners.push(listener)
  }

  notifyDownloadStatus(status: DownloadStatus): void {
    this._statuses.push(status)
  }

  notifyAllDownloadSuccesses(): void {
    this._isAllDownloadComplete = _.every(this._statuses, (status) => {
      return status.success
    })
  }

  isAllDownloadComplete(): boolean {
    return this._isAllDownloadComplete
  }
}
