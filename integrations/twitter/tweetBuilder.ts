import {
  TTextOnlyTweet,
  TPictureTweet,
  TTweet,
  TweetType,
  TTweetBase,
  TPictureTweetItem,
  TPictureTweetResizedURL,
  TTweetContributor,
  TPictureSizeTypes,
} from '.';
import * as _ from 'lodash';
import { SearchResponseItem } from './searchExecutors/type.d';

export class TweetBuilder {
  static build(item: SearchResponseItem): TTweet {
    const base = this.buildBase(item);

    const pictureItems = this.buildPictureItems(item);
    if (pictureItems === undefined) {
      const tweet: TTextOnlyTweet = Object.assign(base, { type: TweetType.TextOnly });
      return tweet;
    }

    const tweet: TPictureTweet = Object.assign(base, {
      type: TweetType.Picture,
      items: pictureItems,
    });
    return tweet;
  }

  private static buildBase(item: SearchResponseItem): TTweetBase {
    const contributorData = item.contributor;

    const contributor: TTweetContributor = {
      number: contributorData.id,
      identificationName: contributorData.username,
      displayName: contributorData.name,
    };

    return {
      id: item.id,
      text: item.text,
      hashtags: item.hashtags,
      type: TweetType.Unknown,
      contributor: contributor,
      tweeted_at: item.tweeted_at,
    };
  }

  private static buildPictureItems(item: SearchResponseItem): TPictureTweetItem[] | undefined {
    if (_.isEmpty(item.photoURLs)) {
      return undefined;
    }

    let mediaItems: TPictureTweetItem[] = [];
    item.photoURLs!.forEach((photoURL) => {
      mediaItems = [
        ...mediaItems,
        {
          pictureResizedURLs: this.buildResizedURL(photoURL.url),
          pictureOriginalURL: photoURL.url,
          pictureNumber: photoURL.id,
        },
      ];
    });

    if (mediaItems.length > 0) {
      return mediaItems;
    }

    return undefined;
  }

  private static buildResizedURL(url: string): TPictureTweetResizedURL[] {
    const types = [
      TPictureSizeTypes.Large,
      TPictureSizeTypes.Medium,
      TPictureSizeTypes.Small,
      TPictureSizeTypes.Thumb,
    ];

    return types.map((type) => {
      return { type: type, src: url + ':' + type };
    });
  }
}
