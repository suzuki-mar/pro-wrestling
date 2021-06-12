import { IAlbum, IExecutionLog } from '../components/interface';
import { IPhoto } from '../interface';
import { sleep } from '../../../test/lib';
import * as _ from 'loadsh';

export class Album implements IAlbum {
  async uploads(uploadPhotos: IPhoto[], log: IExecutionLog): Promise<IExecutionLog> {
    const promises = _.map(uploadPhotos, (photo: IPhoto) => {
      return sleep(() => {
        log.notifyUploadedPhoto(photo);
      });
    });

    await Promise.all(promises).then((results) => {
      log.notifyAllUploaded(this);
    });

    return log;
  }
}
