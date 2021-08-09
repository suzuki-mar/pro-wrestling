import { TWrestlerName } from 'app/wreslters';
import { IPicture, TPictureDisplayInfo, TPictureFileName, TPictureURL } from 'app/albums';
import { TPictureTweet } from 'integrations/twitter';
import _ from 'lodash';
import { DisplayInfoCreator } from './factoires/displayInfoCreator';
import { FileNameCreator } from './factoires/fileNameCreator';
import { URLCreator } from './factoires/urlCreator';
import { Picture } from './picture';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { Priority } from './priorty';

export class PictureFactory {
  isChangingToSetupedName = false;
  paramsList: {};

  async creates(tweets: TPictureTweet[], names: TWrestlerName[]): Promise<IPicture[]> {
    const dispayInfoCreator = new DisplayInfoCreator();
    const displayInfoList = dispayInfoCreator.creats(names, tweets);

    const fileNameCreator = new FileNameCreator();
    const fileNames = fileNameCreator.creates(displayInfoList);

    const urlCreeator = new URLCreator();
    const pictureURLs = urlCreeator.creates(tweets);

    this.buildParamsList(displayInfoList, fileNames, pictureURLs);

    if (this.isChangingToSetupedName) {
      this.assignWreslerNamesFromSetuped(pictureURLs);
    } else {
      await this.assignWreslerNamesFromTweet(displayInfoList, pictureURLs);
    }

    const result = this.buildPictures();
    return result;
  }

  envaleChangingToSetupedName(): PictureFactory {
    this.isChangingToSetupedName = true;
    return this;
  }

  private buildParamsList(
    displayInfoList: TPictureDisplayInfo[],
    fileNames: TPictureFileName[],
    pictureURLs: TPictureURL[]
  ): {} {
    this.paramsList = {};

    displayInfoList.forEach((info) => {
      const number = info.number;

      this.paramsList[number.str] = {};
      this.paramsList[number.str]['priority'] = Priority.buildFromType(number, 'default');
      this.paramsList[number.str]['wrestlerNames'] = [];
      this.paramsList[number.str]['info'] = info;
    });

    fileNames.forEach((fileName) => {
      this.paramsList[fileName.number.str]['fileName'] = fileName;
    });

    pictureURLs.forEach((url) => {
      this.paramsList[url.number.str]['url'] = url;
    });

    return this.paramsList;
  }

  private assignWreslerNamesFromTweet(
    displayInfoList: TPictureDisplayInfo[],
    pictureURLs: TPictureURL[]
  ) {
    pictureURLs.forEach((url) => {
      const info = displayInfoList.find((info) => {
        return info.number.equal(url.number);
      });

      this.paramsList[url.number.str]['wrestlerNames'] = info!.wrestlerNames;
    });
  }

  private async assignWreslerNamesFromSetuped(pictureURLs: TPictureURL[]) {
    const repository = RepositoryFactory.factoryPictureRepository();
    const urlWithNames = await repository.fetchWrestlerNames(pictureURLs);

    pictureURLs.forEach((pu) => {
      const uwn = urlWithNames.find((uwn) => {
        return pu.originalURL === uwn.url;
      });

      if (uwn === undefined) {
        return;
      }

      this.paramsList[pu.number.str]['wrestlerNames'] = uwn.names;
    });
  }

  private buildPictures(): IPicture[] {
    return _.map(this.paramsList, (params) => {
      return Picture.build(
        params['info'],
        params['fileName'],
        params['url'],
        params['wrestlerNames'],
        params['priority']
      );
    });
  }
}
