import { IListener, DownloadStatus } from "./interface"
import { MockFavoriteWrestlers, MockWrestler, MockAlbum, MockExecutionLog } from "./mockModels"
import * as _ from "lodash"

describe("IFavoriteWrestlers", () => {
  describe("wrestlers", () => {
    it("レスラーのリストを返すこと", () => {
      const favoriteWrestlers = new MockFavoriteWrestlers()

      expect(favoriteWrestlers.wrestlers()).toHaveLength(6)
    })
  })
})

describe("IWrestler", () => {
  describe("name", () => {
    it("nameを取得すること", () => {
      const wrestler = new MockWrestler("test")

      expect(wrestler.name()).toEqual("test")
    })
  })
})

describe("IAlbum", () => {
  describe("downloads", () => {
    const album = new MockAlbum()
    const favoriteWrestlers = new MockFavoriteWrestlers()
    const log = new MockExecutionLog()

    it("完了結果を取得すること", async () => {
      const executedLog = await album.downloads(favoriteWrestlers, log)
      expect(executedLog.isAllDownloadComplete()).toEqual(true)
    })

    it("ダウンロードの処理結果が通知されていること", async () => {
      log.notifyDownloadStatus = jest.fn()
      const executedLog = await album.downloads(favoriteWrestlers, log)

      expect(executedLog.notifyDownloadStatus).toHaveBeenCalledTimes(
        favoriteWrestlers.wrestlers().length
      )
    })

    it("ダウンロードの完了結果が通知されていること", async () => {
      log.notifyAllDownloadSuccesses = jest.fn()
      const executedLog = await album.downloads(favoriteWrestlers, log)

      expect(executedLog.notifyAllDownloadSuccesses).toHaveBeenCalledTimes(1)
    })
  })
})

class MockListener implements IListener {
  update(status: DownloadStatus): void {}

  updateAllFinsh(status: DownloadStatus): void {}
}

describe("IExecutionLog", () => {
  describe("addProcessListener", () => {
    it("リスナーが登録されていること", () => {
      const log = new MockExecutionLog()
      const listner = new MockListener()
      log.addProcessListener(listner)

      expect(log.listeners[0]).toEqual(listner)
    })
  })

  describe("一連の通知処理", () => {
    it("一定時間後にtrueが変えること", async () => {
      const log = new MockExecutionLog()
      const wrestler = new MockWrestler("test")

      const status: DownloadStatus = { success: false, wresler: wrestler }
      log.notifyDownloadStatus(status)

      log.notifyAllDownloadSuccesses()

      expect(log.isAllDownloadComplete()).toEqual(false)
    })
  })
})

export {}
