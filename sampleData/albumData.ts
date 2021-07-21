import { TWrestlerName } from 'app/core/wreslter';
import { IAlbum, IAlbumCollection, TPicture, TSource } from 'app/wrespic';
import { Picture } from 'app/wrespic/models/albums/picture';
import { SampleData } from 'sampleData';
import { PictureURLStr } from './pictureURLStr';
import faker from 'faker';
import { AlbumCollection } from 'app/wrespic/models/albums/albmuCollection';
import { Album } from 'app/wrespic/models/albums/album';

export class AlbumData {
  static picture(): TPicture {
    const wrestlerPictureURL = SampleData.wrestlerPictureURL();
    const source = this.source(wrestlerPictureURL.name);
    return Picture.buildFromSource(source);
  }

  static picturesOfMei(): TPicture[] {
    const urls = PictureURLStr.mei();

    return urls.map((url) => {
      const source = this.source(SampleData.meiName());
      return Picture.buildFromSource(source);
    });
  }

  static sources(): TSource[] {
    const wreslterNames = SampleData.wrestlerNames();

    let sources: TSource[] = [];
    wreslterNames.forEach((name) => {
      sources = [...sources, this.source(name)];
    });

    return sources;
  }

  static source(name: TWrestlerName): TSource {
    const urlStr = PictureURLStr.findByWreslterName(name)![0]!;
    const imageURL = SampleData.imageURL(urlStr);

    const source: TSource = {
      imageURL: imageURL,
      name: name,
      date: faker.date.recent(10),
    };

    return source;
  }

  static album(): IAlbum {
    const pictures = SampleData.picturesOfMei();
    const wreslterName = SampleData.meiName();
    return new Album(pictures, wreslterName);
  }

  static albumCollection(): IAlbumCollection {
    const collection = new AlbumCollection();
    collection.buildFromSources(this.sources());
    return collection;
  }
}
