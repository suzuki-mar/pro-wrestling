import { TWrestlerPictureURL } from 'app/wrespic/components/interface';
import { TWrestlerName } from 'app/core/wreslter/interface';
import * as _ from 'loadsh';

class WrestlerPictureURL implements TWrestlerPictureURL {
  constructor(readonly name: TWrestlerName, readonly url: URL) {}
  fileName(): string {
    const paths = this.url.toString().split('/');
    return _.last(paths) as string;
  }
}
