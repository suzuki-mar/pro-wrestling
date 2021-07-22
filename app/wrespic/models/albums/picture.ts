import { TImageURL, TPicture, TSource } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { format } from 'date-fns';
import * as _ from 'loadsh';

export class Picture implements TPicture {
  static buildFromSource(source: TSource): TPicture {
    return new this(source, []);
  }

  static rebuildWtihWrestlerNames(picture: TPicture, wrestlerNames: TWrestlerName[]): TPicture {
    let uniquedWrestlerNames: TWrestlerName[] = [];

    wrestlerNames.forEach((name) => {
      const alreadyExists = uniquedWrestlerNames.some((n) => name.equal(n));
      if (!alreadyExists) {
        uniquedWrestlerNames = [...uniquedWrestlerNames, name];
      }
    });

    let fileNames: string[] = [];
    uniquedWrestlerNames.forEach((name) => {
      fileNames = [...fileNames, name.full];
    });
    fileNames = [...fileNames, format(picture.source.date, 'yyyyMMdd_HH')];
    console.log(fileNames);

    const fileName = fileNames.join('_');
    return new this(picture.source, uniquedWrestlerNames, fileName);
  }

  static rebuildWtihUniqueFileName(picture: TPicture): TPicture {
    const uniqueNumber = Math.floor(Math.random() * 1000);
    const fileName = `${picture.fileName}_${uniqueNumber}`;

    return new this(picture.source, picture.wrestlerNames, fileName);
  }

  displayName(): string {
    const wrestlerNameStrs = this.wrestlerNames.map((name) => name.full);
    const wrestlerStr = wrestlerNameStrs.join(':');
    const year = format(this.source.date, 'yyyy');
    const day = format(this.source.date, 'M.d');

    return `${wrestlerStr} ${year} ${day}`;
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
