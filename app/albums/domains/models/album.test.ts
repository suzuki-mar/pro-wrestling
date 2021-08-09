import { SampleData } from 'sampleData';
import { IPicture } from 'app/albums';
import { WrestlerType } from './types/wrestlerType';
import { Album } from './album';

describe('Album', () => {
  it('アイテム制限ができていること', () => {
    const name = SampleData.mioName();

    let pictures: IPicture[] = [];

    while (pictures.length <= Album.MAX_COUNT) {
      pictures = pictures.concat(SampleData.pictures(name));
    }

    const wreslerType = new WrestlerType(name);
    const album = new Album(wreslerType, pictures);
    expect(album.count()).toEqual(Album.MAX_COUNT);
  });
});

export {};
