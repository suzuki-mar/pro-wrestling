import { IAlbum, IAlbumCollection, TImageURL, TPicture, TSource } from 'app/wrespic';
import { TWrestlerName, IWrestler } from 'app/core/wreslter';
import { TPictureTweet, TTweet } from 'integrations/twitter';
import { WrestlerData } from './wrestlerData';
import { TweetData } from './tweetData';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { PictureURLStr } from './pictureURLStr';
import { AlbumData } from './albumData';

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

  static picture(): TPicture {
    return AlbumData.picture();
  }

  static picturesOfMei(): TPicture[] {
    return AlbumData.picturesOfMei();
  }

  static sources(): TSource[] {
    return AlbumData.sources();
  }

  static source(name: TWrestlerName): TSource {
    return AlbumData.source(name);
  }

  static album(): IAlbum {
    return AlbumData.album();
  }

  static albumCollection(): IAlbumCollection {
    return AlbumData.albumCollection();
  }

  static imageURLStr(): string {
    return PictureURLStr.profile();
  }

  static imageURL(urlStr: string): TImageURL {
    return { original: urlStr };
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
