import { SampleData } from 'sampleData';
import { TPicture } from 'app/wrespic';
import { WrestlerType } from './types/wrestlerType';
import { Album } from './album';

describe('Album', () => {
  it('アイテム制限ができていること', () => {
    const name = SampleData.mioName();

    let pictures: TPicture[] = [];

    while (pictures.length <= Album.MAX_COUNT) {
      pictures = pictures.concat(SampleData.pictures(name));
    }

    const wreslerType = new WrestlerType(name);
    const album = new Album(wreslerType, pictures);
    expect(album.count()).toEqual(Album.MAX_COUNT);
  });
});

export {};
