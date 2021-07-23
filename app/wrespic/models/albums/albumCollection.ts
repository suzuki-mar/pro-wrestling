import { TWrestlerName } from 'app/core/wreslter';
import { IAlbum, IAlbumCollection, TPicture } from 'app/wrespic';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { TPictureTweet } from 'integrations/twitter';
import { Album } from './album';
import { PictureFactory } from './pictures/pictureFactory';

export class AlbumCollection implements IAlbumCollection {
  protected _currentSelectedAlbums: IAlbum[] = [];
  protected _albums: IAlbum[] = [];

  async load(names: TWrestlerName[]): Promise<void> {
    const pictureTweets = await this.searchPictureTweets(names);

    const pictureFactory = new PictureFactory();
    const pictures = pictureFactory.creates(pictureTweets, names);

    this._albums = names.map((name) => {
      return Album.buildForWrestler(name, pictures);
    });

    this._currentSelectedAlbums = [...this._albums];
  }

  filterAlbumsByWrestlerNames(names: TWrestlerName[]) {
    const filterdAlbums = this._albums.filter((album) => {
      return names.some((name) => {
        return album.wrestlerName.equal(name);
      });
    });

    this._currentSelectedAlbums = filterdAlbums;
  }

  currentSelectedAlbums(): IAlbum[] {
    return this._currentSelectedAlbums;
  }

  static rebuild(names: TWrestlerName[], pictures: TPicture[]): IAlbumCollection {
    const collection = new AlbumCollection();
    collection._albums = AlbumCollection.createsAlbums(names, pictures);
    return collection;
  }

  albums() {
    return this._albums;
  }

  private async searchPictureTweets(names: TWrestlerName[]): Promise<TPictureTweet[]> {
    const tweetRepository = RepositoryFactory.factoryTweetRepository();
    const promotRepository = RepositoryFactory.factoryPromoterRepository();
    const promots = await promotRepository.featchAll();
    return tweetRepository.fetchPictureTweetByWrestlerNames(names, promots);
  }

  private static createsAlbums(names: TWrestlerName[], pictures: TPicture[]) {
    return names.map((name) => {
      return Album.buildForWrestler(name, pictures);
    });
  }
}
