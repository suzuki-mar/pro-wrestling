import { TPictureDisplayInfo, TPicture, TPictureFileName, TPictureURL } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import * as _ from 'loadsh';
import { format } from 'date-fns';

export class Picture implements TPicture {
  static build(
    displayInfo: TPictureDisplayInfo,
    fileName: TPictureFileName,
    url: TPictureURL
  ): TPicture {
    return new Picture(displayInfo, fileName, url);
  }

  isRelated(name: TWrestlerName): boolean {
    return _.some(this.displayInfo.wrestlerNames, (n: TWrestlerName) => {
      return name.equal(n);
    });
  }

  postDay(): string {
    return format(this.displayInfo.date, 'yyyy-MM-dd');
  }

  equal(compare: TPicture): boolean {
    return this.pictureURL.originalURL === compare.pictureURL.originalURL;
  }

  private constructor(
    readonly displayInfo: TPictureDisplayInfo,
    readonly fileName: TPictureFileName,
    readonly pictureURL: TPictureURL
  ) {}
}
