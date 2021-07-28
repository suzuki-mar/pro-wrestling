import { TWrestlerName } from 'app/core/wreslter';
import { TPicture, TPictureDisplayInfo, TPictureFileName, TPictureURL } from 'app/wrespic';
import { TPictureTweet } from 'integrations/twitter';
import _ from 'lodash';
import { DisplayInfoCreator } from './factoires/displayInfoCreator';
import { FileNameCreator } from './factoires/fileNameCreator';
import { Picture } from './picture';
import { PictureNumber } from './pictureNumber';
import { PictureURL } from './pictureURL';

export class PictureFactory {
  creates(tweets: TPictureTweet[], names: TWrestlerName[]): TPicture[] {
    const dispayInfoCreator = new DisplayInfoCreator();
    const displayInfoList = dispayInfoCreator.creats(names, tweets);

    const fileNameCreator = new FileNameCreator();
    const fileNames = fileNameCreator.creates(displayInfoList);

    const pictureURLs = this.createPictureURLs(tweets);

    return this.mergeValueObjects(displayInfoList, fileNames, pictureURLs);
  }

  private createPictureURLs(tweets: TPictureTweet[]): TPictureURL[] {
    return tweets.map((tweet) => {
      const number = PictureNumber.build(tweet.pictureNumber);
      return PictureURL.build(tweet.pictureURL, number);
    });
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
