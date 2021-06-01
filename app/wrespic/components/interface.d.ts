import { IFavoriteWrestlers, IWrestler, IAlbum, IExecutionLog, DownloadStatus } from "./interface"
import * as _ from "lodash"
import { sleep } from "../../../test/lib"

import faker from "faker"

export interface IFavoriteWrestlers {
  wrestlers(): IWrestler[]
}

export interface IWrestler {
  name(): string
}

export interface IAlbum {
  downloads(wrestlers: IFavoriteWrestlers, log: IExecutionLog): Promise<IExecutionLog>
}

export interface IExecutionLog {
  addProcessListener(listener: IListener): void
  notifyDownloadStatus(status: DownloadStatus): void
  notifyAllDownloadSuccesses(): void
  isAllDownloadComplete(): boolean
}

export interface IListener {
  update(status: DownloadStatus): void
  updateAllFinsh(status: DownloadStatus): void
}

export type DownloadStatus = {
  success: boolean
  wresler: IWrestler
}
