import { TImageURL, TPicture, TSource } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { format } from 'date-fns';
import * as _ from 'loadsh';

export class Picture implements TPicture {
  static buildFromSource(source: TSource) {
    return new this(source, source.imageURL, source.date, []);
  }

  static rebuildWtihWrestlerNames(picture: Picture, wrestlerNames: TWrestlerName[]) {
    let fileNames: string[] = [];
    wrestlerNames.forEach((name) => {
      fileNames = [...fileNames, name.full];
    });
    fileNames = [...fileNames, format(picture.date, 'yyyy_MM_dd_HH_mm')];

    const fileName = fileNames.join('_');
    return new this(picture.source, picture.imageURL, picture.date, wrestlerNames, fileName);
  }

  static rebuildWtihUniqueFileName(picture: Picture) {
    const uniqueNumber = Math.floor(Math.random() * 1000);
    const fileName = `${picture.fileName}_${uniqueNumber}`;

    return new this(
      picture.source,
      picture.imageURL,
      picture.date,
      picture.wrestlerNames,
      fileName
    );
  }

  originalImageURL(): string {
    return this.source.imageURL.original;
  }

  isSameURL(compare: TSource | TPicture) {
    return this.imageURL === compare.imageURL;
  }

  isRelated(name: TWrestlerName): boolean {
    return _.some(this.wrestlerNames, (n: TWrestlerName) => {
      return name.equal(n);
    });
  }

  private constructor(
    readonly source: TSource,
    readonly imageURL: TImageURL,
    readonly date: Date,
    readonly wrestlerNames: TWrestlerName[],
    readonly fileName?: string
  ) {}
}
