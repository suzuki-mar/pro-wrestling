import { TWrestlerPictureURL } from 'app/wrespic/components/interface';
import { WrestlerName } from 'app/core/wreslter/interface';
import * as _ from 'loadsh';

class WrestlerPictureURL implements TWrestlerPictureURL {
  constructor(readonly name: WrestlerName, readonly url: URL) {}
  fileName(): string {
    const paths = this.url.toString().split('/');
    return _.last(paths) as string;
  }
}
