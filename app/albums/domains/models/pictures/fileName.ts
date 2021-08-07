import { TWrestlerName } from 'app/wreslters';
import { TPictureDisplayInfo, TPictureFileName, TPictureNumber } from 'app/albums';
import { format } from 'date-fns';

export class FileName implements TPictureFileName {
  static buildFromDisplayInfo(info: TPictureDisplayInfo): TPictureFileName {
    let uniquedWrestlerNames: TWrestlerName[] = [];

    info.wrestlerNames.forEach((name) => {
      const alreadyExists = uniquedWrestlerNames.some((n) => name.equal(n));
      if (!alreadyExists) {
        uniquedWrestlerNames = [...uniquedWrestlerNames, name];
      }
    });

    let names: string[] = [];
    uniquedWrestlerNames.forEach((name) => {
      names = [...names, name.full];
    });
    names = [...names, format(info.date, 'yyyyMMdd_HH')];

    return new FileName(names.join('_'), info.number);
  }

  equal(compare: TPictureFileName): boolean {
    return this.name === compare.name;
  }

  static rebuildFromFileNameStr(fileNameStr: string, number: TPictureNumber): TPictureFileName {
    return new FileName(fileNameStr, number);
  }

  static rebuildToUnique(fileName: TPictureFileName): TPictureFileName {
    const uniqueNumber = Math.floor(Math.random() * 1000);
    return new FileName(`${fileName.name}_${uniqueNumber}`, fileName.number);
  }

  protected constructor(readonly name: string, readonly number: TPictureNumber) {}
}
