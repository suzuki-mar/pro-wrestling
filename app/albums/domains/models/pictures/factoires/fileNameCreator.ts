import { TPictureDisplayInfo } from 'app/albums';
import { FileName } from '../fileName';

export class FileNameCreator {
  private _fileNames: FileName[];

  creates(displayInfoList: TPictureDisplayInfo[]) {
    this._fileNames = [];

    displayInfoList.forEach((info) => {
      this._fileNames = [...this._fileNames, FileName.buildFromDisplayInfo(info)];
    });

    this.changeFileNameIfNeeded();

    return this._fileNames;
  }

  private changeFileNameIfNeeded() {
    this._fileNames.forEach((fileName, i) => {
      const needed = this._fileNames.some((fn) => {
        const conditions_for_changing_name =
          fileName.equal(fn) && !fileName.number.equal(fn.number);

        if (!conditions_for_changing_name) {
          return false;
        }
        return true;
      });

      if (needed) {
        this._fileNames[i] = FileName.rebuildToUnique(fileName);
      }
    });
  }
}
