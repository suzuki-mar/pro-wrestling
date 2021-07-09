import { TPicture, TSource, IAlbum } from 'app/wrespic';
import * as _ from 'loadsh';
import { Picture } from './picture';
import { Album } from './album';
import { IWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';

export class AlbumFactory {
  private pictures: { [key: string]: TPicture } = {};

  constructor(private readonly sources: TSource[]) {}

  create(): IAlbum[] {
    this.setPictureCollection();
    this.changeUniqueFileName();

    let names: WrestlerName[] = this.pluckWrestlerNames();
    const groupedPictures: { [key: string]: TPicture } = {};

    names.forEach((name) => {
      groupedPictures[name.full] = _.filter(this.pictures, (picture: TPicture, urlStr: string) => {
        return _.some(picture.wrestlerNames, (n: IWrestlerName) => {
          return name.equal(n);
        });
      });
    });

    const albums: IAlbum[] = _.map(groupedPictures, (ps, ns) => {
      const name = new WrestlerName(ns);
      return new Album(ps, name);
    });

    return albums;
  }

  private setPictureCollection() {
    this.pictures = {};

    this.sources.forEach((source) => {
      this.addPicture(Picture.buildFromSource(source));
    });

    _.each(this.pictures, (picture: Picture, urlStr: string) => {
      let names = this.sources.map((source) => {
        if (!picture.isSameURL(source)) {
          return undefined;
        }

        return source.name;
      });
      names = _.compact(names);

      this.addPicture(Picture.rebuildWtihWrestlerNames(picture, names as IWrestlerName[]));
    });
  }

  private changeUniqueFileName() {
    _.forEach(this.pictures, (picture: Picture, urlStr: string) => {
      let alreadySupported = false;

      return _.forEach(this.pictures, (p: Picture, urlStr: string) => {
        const conditions_for_changing_name =
          picture.fileName === p.fileName && !picture.isSameURL(p) && !alreadySupported;

        if (!conditions_for_changing_name) {
          return;
        }
        alreadySupported = true;

        this.pictures[picture.urlStr] = Picture.rebuildWtihUniqueFileName(picture);
      });
    });
  }

  private pluckWrestlerNames(): IWrestlerName[] {
    let names: WrestlerName[] = [];
    names = _.map(this.pictures, (picture: TPicture, urlStr: string) => {
      return _.flatten(picture.wrestlerNames);
    });
    names = _.flatten(names);
    return _.uniq(names);
  }

  private addPicture(picture: TPicture) {
    this.pictures[picture.urlStr] = picture;
  }
}
