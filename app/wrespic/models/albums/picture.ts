import { TImageURL, TPicture, TSource } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { format } from 'date-fns';
import * as _ from 'loadsh';

export class Picture implements TPicture {
  static buildFromSource(source: TSource) {
    return new this(source, []);
  }

  static rebuildWtihWrestlerNames(picture: Picture, wrestlerNames: TWrestlerName[]) {
    let fileNames: string[] = [];
    wrestlerNames.forEach((name) => {
      fileNames = [...fileNames, name.full];
    });
    fileNames = [...fileNames, format(picture.source.date, 'yyyy_MM_dd_HH_mm')];

    const fileName = fileNames.join('_');
    return new this(picture.source, wrestlerNames, fileName);
  }

  static rebuildWtihUniqueFileName(picture: Picture) {
    const uniqueNumber = Math.floor(Math.random() * 1000);
    const fileName = `${picture.fileName}_${uniqueNumber}`;

    return new this(picture.source, picture.wrestlerNames, fileName);
  }

  originalImageURL(): string {
    return this.source.imageURL.original;
  }

  isSameURL(imageURL: TImageURL) {
    return this.source.imageURL.original === imageURL.original;
  }

  isRelated(name: TWrestlerName): boolean {
    return _.some(this.wrestlerNames, (n: TWrestlerName) => {
      return name.equal(n);
    });
  }

  private constructor(
    readonly source: TSource,
    readonly wrestlerNames: TWrestlerName[],
    readonly fileName?: string
  ) {}
}
