import { TPictureDisplayInfo } from 'app/albums';
import { TWrestlerName } from 'app/wreslters';
import { TPictureTweet } from 'integrations/twitter';
import * as _ from 'loadsh';
import { DisplayInfo } from '../displayInfo';

export class DisplayInfoCreator {
  creats(names: TWrestlerName[], pictureTweets: TPictureTweet[]): TPictureDisplayInfo[] {
    let displayInfoList = this.builds(names, pictureTweets);
    displayInfoList = this.sortedByWrestlerName(names, displayInfoList);
    displayInfoList = this.mergePicturesbySamePictureURL(displayInfoList);
    return displayInfoList as TPictureDisplayInfo[];
  }

  private builds(names: TWrestlerName[], pictureTweets: TPictureTweet[]): TPictureDisplayInfo[] {
    let displayInfoList: TPictureDisplayInfo[] = [];

    pictureTweets.forEach((pictureTweet) => {
      pictureTweet.hashtags!.forEach((hashtag) => {
        pictureTweet.items.forEach((item) => {
          displayInfoList = displayInfoList.concat(
            DisplayInfo.creates(names, pictureTweet, hashtag, item)
          );
        });
      });
    });

    return displayInfoList;
  }

  private sortedByWrestlerName(
    names: TWrestlerName[],
    displayInfoList: TPictureDisplayInfo[]
  ): TPictureDisplayInfo[] {
    let groupedDisplayInfoList = {};

    names.forEach((name) => {
      groupedDisplayInfoList[name.full] = [];
    });

    displayInfoList.forEach((info) => {
      groupedDisplayInfoList[info.wrestlerNames[0]!.full].push(info);
    });

    let sortedInfoList = [];

    names.forEach((name) => {
      sortedInfoList = sortedInfoList.concat(groupedDisplayInfoList[name.full]);
    });

    return sortedInfoList;
  }

  private mergePicturesbySamePictureURL(
    displayInfoList: TPictureDisplayInfo[]
  ): TPictureDisplayInfo[] {
    let groupdDisplayInfoList = {};
    let result: TPictureDisplayInfo[] = [];

    const pictureNumberStrs = displayInfoList.map((info) => info.number.str);
    pictureNumberStrs.forEach((numberStr) => {
      groupdDisplayInfoList[numberStr] = [];
    });

    displayInfoList.forEach((info) => {
      const key = info.number.str;
      groupdDisplayInfoList[key] = [...groupdDisplayInfoList[key], info];
    });

    _.forEach(groupdDisplayInfoList, (displayInfoList: TPictureDisplayInfo[]) => {
      const names = displayInfoList.map((p) => p.wrestlerNames[0]);
      const info = DisplayInfo.mergeFromWreslerNames(names as TWrestlerName[], displayInfoList[0]!);
      result = [...result, info];
    });

    return result;
  }
}
