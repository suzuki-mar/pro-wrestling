import { SampleData } from 'sampleData';
import { ResponseData } from 'sampleData/responseData';
import { AlbumSerializer } from './albumSerializer';

describe('toAlbumCollection', () => {
  it('PictureURLのシリアライズできていること', () => {
    const responseData = ResponseData.fetchAlbumCollection();

    const collection = AlbumSerializer.toAlbumCollection(responseData, SampleData.wrestlerNames());

    const displayableAlubms = collection.albums().filter((album) => {
      return album.isDisplayable;
    });

    const picture = displayableAlubms[0]!.pictures()[0]!;

    expect(picture.pictureURL.defaultSizeURL).not.toBeUndefined();
  });
});
