import { TPicture, TWrestlerPictureURL } from 'app/wrespic';
import * as _ from 'loadsh';
import { format } from 'date-fns';

export class PictureListCreator {
  private pictures: TPicture[] = [];

  constructor(private readonly pictureURLs: TWrestlerPictureURL[]) {}

  create(): TPicture[] {
    this.pictures = this.createPictureList();
    this.addFileNameToPictures();
    this.changeUniqueFileName();

    return this.pictures;
  }

  private createPictureList(): TPicture[] {
    let pictureList = {};
    _.each(this.pictureURLs, (pu) => {
      pictureList[pu.urlStr] = {
        urlStr: pu.urlStr,
        wrestlerNames: [],
        date: pu.date,
        fileName: undefined,
      };
    });

    _.each(pictureList, (picture, urlStr) => {
      _.each(this.pictureURLs, (pictureUrl) => {
        if (urlStr === pictureUrl.urlStr) {
          picture['wrestlerNames'].push(pictureUrl.name);
        }
      });
    });

    return _.map(pictureList, (photo, _) => {
      return photo;
    });
  }

  private addFileNameToPictures(): void {
    this.pictures.forEach((picture) => {
      let nameStrs = picture.wrestlerNames.map((name) => {
        return `${name.full}`;
      });

      const dateStr = this.createDateSrr(picture.date);
      nameStrs.push(dateStr);
      picture.fileName = nameStrs.join('_');
    });
  }

  private changeUniqueFileName() {
    const fileNameAndURLs = this.pictures.map((picture) => {
      return { fileName: picture.fileName!, urlStr: picture.urlStr };
    });

    fileNameAndURLs.forEach((fileNameAndURL) => {
      let alreadySupported = false;

      fileNameAndURLs.forEach((fu) => {
        const conditions_for_changing_name =
          fileNameAndURL.fileName === fu.fileName &&
          fileNameAndURL.urlStr !== fu.urlStr &&
          !alreadySupported;

        if (conditions_for_changing_name) {
          const uniqueNumber = Math.floor(Math.random() * 1000);

          const picture = this.pictures.find((picture) => {
            return fileNameAndURL.urlStr === picture.urlStr;
          });

          picture!.fileName += `_${uniqueNumber}`;
          alreadySupported = true;
        }
      });
    });
  }

  private createDateSrr(date: Date): string {
    return format(date, 'yyyy_MM_dd_HH_mm');
  }
}
