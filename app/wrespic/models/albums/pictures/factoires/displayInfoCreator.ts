import { TPictureDisplayInfo } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { TPictureTweet, TPictureTweetItem } from 'integrations/twitter';
import * as _ from 'loadsh';
import { DisplayInfo } from '../displayInfo';
import { PictureNumber } from '../pictureNumber';

export class DisplayInfoCreator {
  creats(names: TWrestlerName[], pictureTweets: TPictureTweet[]): TPictureDisplayInfo[] {
    let displayInfoList = this.builds(names, pictureTweets);
    displayInfoList = this.sortedByWrestlerName(names, displayInfoList);
    displayInfoList = this.mergePicturesbySamePictureURL(displayInfoList);
    return displayInfoList;
  }

  private builds(names: TWrestlerName[], pictureTweets: TPictureTweet[]): TPictureDisplayInfo[] {
    let displayInfoList: TPictureDisplayInfo[] = [];

    pictureTweets.forEach((pictureTweet) => {
      pictureTweet.hashtags.forEach((hashtag) => {
        pictureTweet.items.forEach((item) => {
          displayInfoList = displayInfoList.concat(
            this.createDisplayInfoList(names, pictureTweet, hashtag, item)
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

  private createDisplayInfoList(
    names: TWrestlerName[],
    tweet: TPictureTweet,
    hashtag: string,
    item: TPictureTweetItem
  ): TPictureDisplayInfo[] {
    const displayInfoList = names.map((name) => {
      if (name.full !== hashtag) {
        return undefined;
      }

      const number = PictureNumber.build(item.pictureNumber);

      return new DisplayInfo(number, tweet.contributor, tweet.tweeted_at, [name]);
    });

    return displayInfoList.filter((info) => info !== undefined) as TPictureDisplayInfo[];
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
