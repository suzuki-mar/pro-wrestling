import { TWrestlerName } from 'app/wreslters';
import { Promoter } from 'app/wreslters/domains/models/promoter';
import { AlbumKind, IAlbum, IAlbumCollection, TPicture } from 'app/albums';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { TPictureTweet } from 'integrations/twitter';
import { Album } from './album';
import { PictureFactory } from './pictures/pictureFactory';
import { PromoterType } from './types/promoterType';
import { WrestlerType } from './types/wrestlerType';

export class AlbumCollection implements IAlbumCollection {
  protected _currentSelectedAlbums: IAlbum[] = [];
  protected _wreslerAlbums: IAlbum[] = [];
  protected _promoteAlbums: IAlbum[] = [];

  async load(names: TWrestlerName[]): Promise<void> {
    const promoter = Promoter.buildMarvelous();
    const allInvalidNames = names.every((name) => {
      return !promoter.isBelongTo(name);
    });

    if (allInvalidNames) {
      this._wreslerAlbums = [];
      this._promoteAlbums = [];
      this._currentSelectedAlbums = [];
      return;
    }

    const pictureTweets = await this.searchPictureTweets(names);
    const pictureFactory = new PictureFactory();
    const pictures = pictureFactory.creates(pictureTweets, names);

    this._wreslerAlbums = names.map((name) => {
      const type = new WrestlerType(name);
      return new Album(type, pictures);
    });

    const type = new PromoterType(promoter);
    this._promoteAlbums = [new Album(type, pictures)];

    this._currentSelectedAlbums = this._promoteAlbums;
  }

  filterAlbumsByWrestlerNames(names: TWrestlerName[]) {
    const filterdAlbums = this._wreslerAlbums.filter((album) => {
      return names.some((name) => {
        const wrestlerType = album.type() as WrestlerType;

        return wrestlerType.wrestlerName().equal(name);
      });
    });

    this._currentSelectedAlbums = filterdAlbums;

    if (this._promoteAlbums.length > 0) {
      this._currentSelectedAlbums = this._currentSelectedAlbums.concat(this._promoteAlbums);
    }
  }

  albumsFromKind(kind: AlbumKind): IAlbum[] {
    const filterd = this.allAlbums().filter((album) => {
      const albumKind = album.type()!.kind();
      return albumKind === kind;
    });

    return filterd as IAlbum[];
  }

  currentSelectedAlbums(): IAlbum[] {
    return this._currentSelectedAlbums;
  }

  static rebuild(names: TWrestlerName[], pictures: TPicture[]): IAlbumCollection {
    const collection = new AlbumCollection();

    collection._wreslerAlbums = AlbumCollection.createsWrestlerAlbums(names, pictures);

    const promoter = Promoter.buildMarvelous();
    const promoterType = new PromoterType(promoter);
    collection._promoteAlbums = [new Album(promoterType, pictures)];
    collection._currentSelectedAlbums = [...collection._promoteAlbums];

    return collection;
  }

  allAlbums(): IAlbum[] {
    return this._wreslerAlbums!.concat(this._promoteAlbums!);
  }

  private async searchPictureTweets(names: TWrestlerName[]): Promise<TPictureTweet[]> {
    const tweetRepository = RepositoryFactory.factoryTweetRepository();
    const promotRepository = RepositoryFactory.factoryPromoterRepository();
    const promots = await promotRepository.featchAll();

    const twitterIds = tweetRepository.fetchDefaultLoadingIDs();

    const promises = [
      tweetRepository.fetchPictureTweetByWrestlerNames(names, promots),
      tweetRepository.fetchPictureTweetsByIds(twitterIds),
    ];

    const result = await Promise.all(promises).then((values) => {
      return values.flat();
    });

    return result;
  }

  private static createsWrestlerAlbums(names: TWrestlerName[], pictures: TPicture[]) {
    return names.map((name) => {
      const type = new WrestlerType(name);
      return new Album(type, pictures);
    });
  }
}
