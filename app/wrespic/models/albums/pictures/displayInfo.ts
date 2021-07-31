import { TWrestlerName } from 'app/core/wreslter';
import { TPictureContributor, TPictureDisplayInfo, TPictureNumber } from 'app/wrespic';
import { format } from 'date-fns';

export class DisplayInfo implements TPictureDisplayInfo {
  constructor(
    readonly number: TPictureNumber,
    readonly contributor: TPictureContributor,
    readonly date: Date,
    readonly wrestlerNames: TWrestlerName[]
  ) {}

  formattedDisplayString(): string {
    const wrestlerNameStrs = this.wrestlerNames.map((name) => name.full);
    const wrestlerStr = wrestlerNameStrs.join(':');
    const year = format(this.date, 'yyyy');
    const day = format(this.date, 'M.d');

    return `${wrestlerStr} ${year} ${day}`;
  }

  static mergeFromWreslerNames(
    target: TWrestlerName[],
    base: TPictureDisplayInfo
  ): TPictureDisplayInfo {
    let mergedWreslerNames: TWrestlerName[] = [...base.wrestlerNames];

    target.forEach((name) => {
      let alreadyExsits = mergedWreslerNames.some((n) => {
        return name.equal(n);
      });

      if (!alreadyExsits) {
        mergedWreslerNames = [...mergedWreslerNames, name];
      }
    });

    return new DisplayInfo(base.number, base.contributor, base.date, mergedWreslerNames);
  }
}
