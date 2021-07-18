import { TPicture, TSource, IAlbum } from 'app/wrespic';
import * as _ from 'loadsh';
import { Picture } from './picture';
import { Album } from './album';
import { TWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';

export class AlbumBuilder {
  private pictures: { [key: string]: TPicture } = {};

  constructor(private readonly sources: TSource[]) {}

  create(): IAlbum[] {
    this.setPictureCollection();
    this.changeUniqueFileName();

    let names: WrestlerName[] = this.pluckWrestlerNames();
    const groupedPictures: { [key: string]: TPicture } = {};

    names.forEach((name) => {
      groupedPictures[name.full] = _.filter(this.pictures, (picture: TPicture) => {
        return picture.isRelated(name);
      });
    });

    const albums: IAlbum[] = _.map(groupedPictures, (ps, wn) => {
      const name = new WrestlerName(wn);
      return new Album(ps, name);
    });

    return albums;
  }

  private setPictureCollection() {
    this.pictures = {};

    this.sources.forEach((source) => {
      this.addPicture(Picture.buildFromSource(source));
    });

    _.each(this.pictures, (picture: Picture) => {
      let _names = this.sources.map((source) => {
        if (!picture.isSameURL(source.imageURL)) {
          return undefined;
        }

        return source.name;
      });

      const names: TWrestlerName[] = _.compact(_names);

      this.addPicture(Picture.rebuildWtihWrestlerNames(picture, names));
    });
  }

  private changeUniqueFileName() {
    _.forEach(this.pictures, (picture: Picture) => {
      let alreadySupported = false;

      return _.forEach(this.pictures, (p: Picture) => {
        const conditions_for_changing_name =
          picture.fileName === p.fileName &&
          !picture.isSameURL(p.source.imageURL) &&
          !alreadySupported;

        if (!conditions_for_changing_name) {
          return;
        }
        alreadySupported = true;

        this.pictures[picture.originalImageURL()] = Picture.rebuildWtihUniqueFileName(picture);
      });
    });
  }

  private pluckWrestlerNames(): TWrestlerName[] {
    let names: WrestlerName[] = [];
    names = _.map(this.pictures, (picture: TPicture) => {
      return _.flatten(picture.wrestlerNames);
    });
    names = _.flatten(names);
    return _.uniq(names);
  }

  private addPicture(picture: TPicture) {
    this.pictures[picture.originalImageURL()] = picture;
  }
}
