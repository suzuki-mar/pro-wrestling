import { TWrestlerName } from 'app/wreslters';
import { TPictureContributor, TPictureDisplayInfo, TPictureNumber } from 'app/albums';
import { TPictureTweet, TPictureTweetItem } from 'integrations/twitter';
import { PictureNumber } from './pictureNumber';

export class DisplayInfo implements TPictureDisplayInfo {
  constructor(
    readonly number: TPictureNumber,
    readonly contributor: TPictureContributor,
    readonly date: Date,
    readonly wrestlerNames: TWrestlerName[]
  ) {}

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

  static creates(
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

      const contributor: TPictureContributor = {
        number: tweet.contributor.number,
        displayName: tweet.contributor.displayName,
        identificationName: tweet.contributor.identificationName,
      };

      return new DisplayInfo(number, contributor, tweet.tweeted_at, [name]);
    });

    return displayInfoList.filter((info) => info !== undefined) as TPictureDisplayInfo[];
  }
}
