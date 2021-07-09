import { TPicture, TSource } from 'app/wrespic';
import { IWrestlerName } from 'app/core/wreslter';
import { format } from 'date-fns';

export class Picture implements TPicture {
  static buildFromSource(source: TSource) {
    return new this(source.urlStr, source.date, []);
  }

  static rebuildWtihWrestlerNames(picture: Picture, wrestlerNames: IWrestlerName[]) {
    const fileNames: string[] = [];
    wrestlerNames.forEach((name) => {
      fileNames.push(name.full);
    });
    fileNames.push(format(picture.date, 'yyyy_MM_dd_HH_mm'));

    const fileName = fileNames.join('_');
    return new this(picture.urlStr, picture.date, wrestlerNames, fileName);
  }

  static rebuildWtihUniqueFileName(picture: Picture) {
    const uniqueNumber = Math.floor(Math.random() * 1000);
    const fileName = `${picture.fileName}_${uniqueNumber}`;

    return new this(picture.urlStr, picture.date, picture.wrestlerNames, fileName);
  }

  isSameURL(compare: TSource | TPicture) {
    return this.urlStr === compare.urlStr;
  }

  private constructor(
    readonly urlStr: string,
    readonly date: Date,
    readonly wrestlerNames: IWrestlerName[],
    readonly fileName?: string
  ) {}
}
