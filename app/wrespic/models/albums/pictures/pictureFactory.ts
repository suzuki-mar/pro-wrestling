import { TWrestlerName } from 'app/core/wreslter';
import { TPicture, TPictureDisplayInfo, TPictureFileName, TPictureURL } from 'app/wrespic';
import { TPictureTweet } from 'integrations/twitter';
import _ from 'lodash';
import { DisplayInfoCreator } from './factoires/displayInfoCreator';
import { FileNameCreator } from './factoires/fileNameCreator';
import { URLCreator } from './factoires/urlCreator';
import { Picture } from './picture';

export class PictureFactory {
  creates(tweets: TPictureTweet[], names: TWrestlerName[]): TPicture[] {
    const dispayInfoCreator = new DisplayInfoCreator();
    const displayInfoList = dispayInfoCreator.creats(names, tweets);

    const fileNameCreator = new FileNameCreator();
    const fileNames = fileNameCreator.creates(displayInfoList);

    const urlCreeator = new URLCreator();
    const pictureURLs = urlCreeator.creates(tweets);

    return this.mergeValueObjects(displayInfoList, fileNames, pictureURLs);
  }

  private mergeValueObjects(
    displayInfoList: TPictureDisplayInfo[],
    fileNames: TPictureFileName[],
    pictureURLs: TPictureURL[]
  ): TPicture[] {
    let paramsList = {};

    displayInfoList.forEach((info) => {
      paramsList[info.number.str] = {};
      paramsList[info.number.str]['info'] = info;
    });

    fileNames.forEach((fileName) => {
      paramsList[fileName.number.str]['fileName'] = fileName;
    });

    pictureURLs.forEach((url) => {
      paramsList[url.number.str]['url'] = url;
    });

    return _.map(paramsList, (params) => {
      return Picture.build(params['info'], params['fileName'], params['url']);
    });
  }
}
