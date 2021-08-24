import { IAlbum, IAlbumCollection, IPicture, TPictureDisplayInfo } from 'app/albums';
import { TWrestlerName, IWrestler, IWrestlerCollection, IPromoter } from 'app/wreslters';
import { TPictureTweet, TTextOnlyTweet, TTweet } from 'integrations/twitter';
import { WrestlerData } from './wrestlerData';
import { TweetData } from './tweetData';
import { WrestlerName } from 'app/wreslters/domains/models/wrestlerName';
import { PictureURLStr } from './pictureURLStr';
import { AlbumData } from './albumData';
import { WrestlerCollection } from 'app/wreslters/domains/models/wrestlerCollection';
import faker from 'faker';
import { ContestData } from './contestData';
import { IContest } from 'app/contests';
import { PictureURLWithWrestlerNames } from 'app/albums/domains/models/type';

export class SampleData {
  static readonly SET_UPED_PICTURE_URL = 'https://pbs.twimg.com/media/E35SeUrVkAEMFCP.jpg';

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
    return new WrestlerName(faker.name.firstName() + faker.random.alpha(), true);
  }

  static picture(): IPicture {
    return AlbumData.picture();
  }

  static pictures(wreslerName: TWrestlerName): IPicture[] {
    return AlbumData.pictures(wreslerName);
  }

  static album(wreslerName: TWrestlerName): IAlbum {
    return AlbumData.album(wreslerName);
  }

  static albumCollection(wreslerNames: TWrestlerName[]): IAlbumCollection {
    return AlbumData.albumCollection(wreslerNames);
  }

  static pictureDisplayInfo(name: TWrestlerName): TPictureDisplayInfo {
    return AlbumData.displayInfo(name);
  }

  static imageURLStr(): string {
    return PictureURLStr.all()[0]!;
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

  static textTweets(): TTextOnlyTweet[] {
    return TweetData.texts();
  }

  static promoter(): IPromoter {
    return WrestlerData.promoter();
  }

  static contents(): IContest[] {
    return ContestData.creates();
  }

  static pictureURLWithWrestlerNames(): PictureURLWithWrestlerNames {
    return {
      url: SampleData.SET_UPED_PICTURE_URL,
      names: [SampleData.mioName()],
    };
  }
}
