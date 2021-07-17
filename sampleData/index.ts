import { IAlbum, IAlbumCollection, TPicture, TSource } from 'app/wrespic';
import { TWrestlerName, IWrestler } from 'app/core/wreslter';
import { TPictureTweet, TTweet } from 'integrations/twitter/interface';
import { WrestlerData } from './wrestlerData';
import { TweetData } from './tweetData';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { Album } from 'app/wrespic/models/albums/album';
import { PictureURLStr } from './pictureURLStr';
import faker from 'faker';
import { AlbumCollection } from 'app/wrespic/models/albums/albmuCollection';

export class SampleData {
  static wrestlerNames(): TWrestlerName[] {
    return WrestlerData.names();
  }

  static wrestlerName(): TWrestlerName {
    return WrestlerData.wrestlerName();
  }

  static wrestlers(): IWrestler[] {
    return WrestlerData.wrestlers();
  }

  static wrestler(): IWrestler {
    return WrestlerData.wrestlers()[0]!;
  }

  static meiName(): TWrestlerName {
    return new WrestlerName('星月芽依');
  }

  static mioName(): TWrestlerName {
    return new WrestlerName('桃野美桜');
  }

  static wrestlerPictureURL(): TSource {
    return WrestlerData.pictureURL();
  }

  static picture(): TPicture {
    const wrestlerPictureURL = this.wrestlerPictureURL();
    return {
      urlStr: wrestlerPictureURL.urlStr,
      wrestlerNames: [wrestlerPictureURL.name],
      date: wrestlerPictureURL.date,
      fileName: undefined,
    };
  }

  static picturesOfMei(): TPicture[] {
    const urls = PictureURLStr.mei();

    const name = this.meiName();

    return urls.map((url) => {
      return {
        urlStr: url,
        wrestlerNames: [name],
        date: this.matchDay(),
      };
    });
  }

  static sources(): TSource[] {
    const wreslterNames = this.wrestlerNames();

    let sources: TSource[] = [];
    wreslterNames.forEach((name) => {
      const urlStrs = PictureURLStr.findByWreslterName(name)!;
      urlStrs.forEach((urlStr) => {
        const source: TSource = {
          urlStr: urlStr,
          name: name,
          date: this.matchDay(),
        };

        sources = [...sources, source];
      });
    });

    return sources;
  }

  static album(): IAlbum {
    const pictures = this.picturesOfMei();
    const wreslterName = this.meiName();
    return new Album(pictures, wreslterName);
  }

  static albumCollection(): IAlbumCollection {
    const collection = new AlbumCollection();
    collection.buildFromSources(this.sources());
    return collection;
  }

  static imageURLStr(): string {
    return PictureURLStr.profile();
  }

  static url(): URL {
    return new URL(this.imageURLStr());
  }

  static tweets(): TTweet[] {
    return TweetData.tweets();
  }

  static pictureTweets(): TPictureTweet[] {
    return TweetData.pictures();
  }

  private static matchDay(): Date {
    return faker.date.recent(10);
  }
}
