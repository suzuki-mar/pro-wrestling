import {
  TPictureSizeTypes,
  TPictureTweet,
  TPictureTweetItem,
  TTextOnlyTweet,
  TTweet,
  TweetType,
  TPictureTweetResizedURL,
  TTweetContributor,
  TTweetURL,
} from 'integrations/twitter';
import faker from 'faker';
import { SampleData } from '../sampleData';
import { TWrestlerName } from 'app/wreslters';
import * as _ from 'loadsh';
import { TwitterID } from 'integrations/twitter/twitterID';

export class TweetData {
  static tweets(): TTweet[] {
    return [...this.pictures(), ...this.texts()];
  }

  static texts(): TTextOnlyTweet[] {
    return [
      this.buildTextOnly([SampleData.meiName()]),
      this.buildTextOnly([SampleData.mioName(), SampleData.meiName()]),
    ];
  }

  static pictures(): TPictureTweet[] {
    const meiTweet = this.buildPicture([SampleData.meiName()]);

    let tweetAtSameTime = this.buildPicture([SampleData.meiName()]);
    tweetAtSameTime = Object.assign(tweetAtSameTime, {
      tweeted_at: meiTweet.tweeted_at,
      urls: this.buildURLs(),
    });

    return [
      meiTweet,
      tweetAtSameTime,
      this.buildPicture([SampleData.mioName(), SampleData.meiName(), SampleData.meiName()]),
    ];
  }

  private static buildTextOnly(names: TWrestlerName[]): TTextOnlyTweet {
    let hashtags = names.map((name) => name.full);
    hashtags = [...hashtags, faker.lorem.slug()];

    const contributor: TTweetContributor = {
      number: faker.datatype.number(1000),
      identificationName: faker.name.firstName() + '_identification',
      displayName: faker.name.firstName() + '_display',
    };

    return {
      id: TwitterID.build(faker.datatype.number().toString()),
      text: faker.lorem.text(),
      type: TweetType.TextOnly,
      hashtags: hashtags,
      tweeted_at: faker.datatype.datetime(),
      contributor: contributor,
      urls: this.buildURLs(),
    };
  }

  private static buildPicture(names: TWrestlerName[]): TPictureTweet {
    let items: TPictureTweetItem[] = [];
    _.times(3, (index) => {
      let pictureOriginalURL =
        index === 0
          ? SampleData.SET_UPED_PICTURE_URL
          : faker.image.imageUrl() + _.random(0, 100000);
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
        src: `${pictureOriginalURL}:${TPictureSizeTypes.Large}`,
      },
      {
        type: TPictureSizeTypes.Medium,
        src: `${pictureOriginalURL}:${TPictureSizeTypes.Medium}`,
      },
      {
        type: TPictureSizeTypes.Small,
        src: `${pictureOriginalURL}:${TPictureSizeTypes.Small}`,
      },
      {
        type: TPictureSizeTypes.Thumb,
        src: `${pictureOriginalURL}:${TPictureSizeTypes.Thumb}`,
      },
    ];

    return resizedURLs;
  }

  private static buildURLs(): TTweetURL[] {
    return [{ urlStr: faker.image.imageUrl() }];
  }
}
