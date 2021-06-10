import { IAlbum, IExecutionLog, DownloadStatus } from '../components/interface';
import { sleep } from '../../../test/lib';
import { IWrestler } from 'app/sub_contexts/wreslter/interface';
import * as _ from 'loadsh';
// import { ClientFactory } from 'db/repositrories/clientFactory';

export class Album implements IAlbum {
  async downloads(wrestlers: IWrestler[], log: IExecutionLog): Promise<IExecutionLog> {
    const promises = _.map(wrestlers, (wresler: IWrestler) => {
      const status: DownloadStatus = { success: true, wresler: wresler };
      return sleep(() => {
        log.notifyDownloadStatus(status);
      });
    });

    await Promise.all(promises).then((results) => {
      log.notifyAllDownloadSuccesses();
    });

    return log;
  }
}
