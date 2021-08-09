import {
  TPictureDisplayInfo,
  IPicture,
  TPictureFileName,
  TPictureURL,
  TPicturePriority,
} from 'app/albums';
import { TWrestlerName } from 'app/wreslters';
import * as _ from 'loadsh';
import { format } from 'date-fns';

export class Picture implements IPicture {
  static build(
    displayInfo: TPictureDisplayInfo,
    fileName: TPictureFileName,
    url: TPictureURL,
    names: TWrestlerName[],
    priority: TPicturePriority
  ): IPicture {
    return new Picture(displayInfo, fileName, url, names, priority);
  }

  isRelated(name: TWrestlerName): boolean {
    return _.some(this.wrestlerNames(), (n: TWrestlerName) => {
      return name.equal(n);
    });
  }

  postDay(): string {
    return format(this.displayInfo().date, 'yyyy-MM-dd');
  }

  title(): string {
    const wrestlerNameStrs = this.wrestlerNames().map((name) => name.full);
    const wrestlerStr = wrestlerNameStrs.join(':');
    const year = format(this.displayInfo().date, 'yyyy');
    const day = format(this.displayInfo().date, 'M.d');

    return `${wrestlerStr} ${year} ${day}`;
  }

  displayInfo(): TPictureDisplayInfo {
    return this._displayInfo;
  }

  fileName(): TPictureFileName {
    return this._fileName;
  }

  pictureURL(): TPictureURL {
    return this._pictureURL;
  }

  wrestlerNames(): TWrestlerName[] {
    return this._wrestlerNames;
  }

  priority(): TPicturePriority {
    return this._priority;
  }

  private constructor(
    readonly _displayInfo: TPictureDisplayInfo,
    readonly _fileName: TPictureFileName,
    readonly _pictureURL: TPictureURL,
    readonly _wrestlerNames: TWrestlerName[],
    readonly _priority: TPicturePriority
  ) {}
}
