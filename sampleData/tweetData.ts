import {
  TPictureSizeTypes,
  TPictureTweet,
  TPictureTweetItem,
  TTextOnlyTweet,
  TTweet,
  TweetType,
  TPictureTweetResizedURL,
} from 'integrations/twitter';
import faker from 'faker';
import { SampleData } from '../sampleData';
import { TWrestlerName } from 'app/core/wreslter';
import * as _ from 'loadsh';

export class TweetData {
  static tweets(): TTweet[] {
    return [
      ...this.pictures(),
      this.buildTextOnly([SampleData.meiName()]),
      this.buildTextOnly([SampleData.mioName(), SampleData.meiName()]),
    ];
  }

  static pictures(): TPictureTweet[] {
    const meiTweet = this.buildPicture([SampleData.meiName()]);

    let tweetAtSameTime = this.buildPicture([SampleData.meiName()]);
    tweetAtSameTime = Object.assign(tweetAtSameTime, { tweeted_at: meiTweet.tweeted_at });

    return [
      meiTweet,
      tweetAtSameTime,
      this.buildPicture([SampleData.mioName(), SampleData.meiName(), SampleData.meiName()]),
    ];
  }

  private static buildTextOnly(names: TWrestlerName[]): TTextOnlyTweet {
    let hashtags = names.map((name) => name.full);
    hashtags = [...hashtags, faker.lorem.slug()];

    return {
      id: faker.datatype.number(),
      text: faker.lorem.text(),
      type: TweetType.TextOnly,
      hashtags: hashtags,
      tweeted_at: faker.datatype.datetime(),
      contributor: faker.name.firstName(),
    };
  }

  private static buildPicture(names: TWrestlerName[]): TPictureTweet {
    let items: TPictureTweetItem[] = [];
    _.times(3, () => {
      const pictureOriginalURL = faker.image.imageUrl() + _.random(0, 100000);
      const item: TPictureTweetItem = {
        pictureOriginalURL: pictureOriginalURL,
        pictureNumber: _.random(1000),
        pictureResizedURLs: this.buildResizedPictureURLs(pictureOriginalURL),
      };

      items = [...items, item];
    });

    return {
      ...this.buildTextOnly(names),
      items: items,
      type: TweetType.Picture,
    };
  }

  private static buildResizedPictureURLs(pictureOriginalURL: string): TPictureTweetResizedURL[] {
    let resizedURLs: TPictureTweetResizedURL[] = [
      {
        type: TPictureSizeTypes.Large,
        size: { width: 1000, height: 1000 },
        src: `${pictureOriginalURL}:${TPictureSizeTypes.Large}`,
      },
      {
        type: TPictureSizeTypes.Medium,
        size: { width: 500, height: 500 },
        src: `${pictureOriginalURL}:${TPictureSizeTypes.Medium}`,
      },
      {
        type: TPictureSizeTypes.Small,
        size: { width: 250, height: 250 },
        src: `${pictureOriginalURL}:${TPictureSizeTypes.Small}`,
      },
      {
        type: TPictureSizeTypes.Thumb,
        size: { width: 50, height: 50 },
        src: `${pictureOriginalURL}:${TPictureSizeTypes.Thumb}`,
      },
    ];

    return resizedURLs;
  }
}
