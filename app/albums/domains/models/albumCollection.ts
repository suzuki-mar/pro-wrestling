import { IPromoter, TWrestlerName } from 'app/wreslters';
import { Promoter } from 'app/wreslters/domains/models/promoter';
import { AlbumKind, IAlbum, IAlbumCollection, IPicture } from 'app/albums';
import { Album } from './album';
import { PictureFactory } from './pictures/pictureFactory';
import { PromoterType } from './types/promoterType';
import { WrestlerType } from './types/wrestlerType';
import { TweetSearcher } from '../services/tweetsSearcher';
import { SampleData } from 'sampleData';

export class AlbumCollection implements IAlbumCollection {
  protected _currentSelectedAlbums: IAlbum[] = [];
  protected _wreslerAlbums: IAlbum[] = [];
  protected _promoteAlbums: IAlbum[] = [];
  private _promoter: IPromoter;
  private _pictures: IPicture[];
  private _names: TWrestlerName[];

  async load(names: TWrestlerName[]): Promise<void> {
    this._names = names;
    this._promoter = Promoter.buildMarvelous();

    const allInvalidNames = names.every((name) => {
      return !this._promoter.isBelongTo(name);
    });

    if (allInvalidNames) {
      this._wreslerAlbums = [];
      this._promoteAlbums = [];
      this._currentSelectedAlbums = [];
      return;
    }

    const searcher = new TweetSearcher();
    const pictureTweets = await searcher.search(this._names);
    const pictureFactory = new PictureFactory();
    this._pictures = await pictureFactory.creates(pictureTweets, names);

    this.createEachAlbums();
  }

  private createEachAlbums() {
    const wreslerAlbums = this._names.map((name) => {
      const type = new WrestlerType(name);
      return new Album(type, this._pictures);
    });

    // FIX　SampleData以外のデータを使用する
    SampleData.wrestlerNames().forEach((name) => {
      const album = wreslerAlbums.find((album) => {
        const type = album._type as WrestlerType;
        return name.equal(type.wrestlerName());
      });

      if (album === undefined) {
        return;
      }

      this._wreslerAlbums = [...this._wreslerAlbums, album!];
    });

    const type = new PromoterType(this._promoter);
    this._promoteAlbums = [new Album(type, this._pictures)];

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

  static rebuild(names: TWrestlerName[], pictures: IPicture[]): IAlbumCollection {
    const collection = new AlbumCollection();

    collection._wreslerAlbums = Album.createsWrestlerAlbums(names, pictures);

    const promoter = Promoter.buildMarvelous();
    const promoterType = new PromoterType(promoter);
    collection._promoteAlbums = [new Album(promoterType, pictures)];
    collection._currentSelectedAlbums = [...collection._promoteAlbums];

    return collection;
  }

  allAlbums(): IAlbum[] {
    return this._wreslerAlbums!.concat(this._promoteAlbums!);
  }
}
