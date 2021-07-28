import { IAlbum, IAlbumCollection, TPicture } from 'app/wrespic';
import { TWrestlerName, IWrestler, IWrestlerCollection } from 'app/core/wreslter';
import { TPictureTweet, TTweet } from 'integrations/twitter';
import { WrestlerData } from './wrestlerData';
import { TweetData } from './tweetData';
import { WrestlerName } from 'app/core/wreslter/models/wrestlerName';
import { PictureURLStr } from './pictureURLStr';
import { AlbumData } from './albumData';
import { WrestlerCollection } from 'app/core/wreslter/models/wrestlerCollection';
import faker from 'faker';

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

  static wrestlerCollection(): IWrestlerCollection {
    return WrestlerCollection.rebuild(WrestlerData.wrestlers());
  }

  static meiName(): TWrestlerName {
    return new WrestlerName('星月芽依', true);
  }

  static mioName(): TWrestlerName {
    return new WrestlerName('桃野美桜', true);
  }

  static mariaName(): TWrestlerName {
    return new WrestlerName('Maria', false);
  }

  static unknownName(): TWrestlerName {
    return new WrestlerName(faker.name.firstName(), true);
  }

  static picture(): TPicture {
    return AlbumData.picture();
  }

  static pictures(wreslerName: TWrestlerName): TPicture[] {
    return AlbumData.pictures(wreslerName);
  }

  static album(wreslerName: TWrestlerName): IAlbum {
    return AlbumData.album(wreslerName);
  }

  static albumCollection(wreslerNames: TWrestlerName[]): IAlbumCollection {
    return AlbumData.albumCollection(wreslerNames);
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
}
