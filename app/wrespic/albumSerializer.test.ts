import { SampleData } from 'sampleData';
import { ResponseData } from 'sampleData/responseData';
import { AlbumSerializer } from './albumSerializer';

describe('toAlbumCollection', () => {
  it('displayInfoのシリアライズができていること', () => {
    const responseData = ResponseData.fetchAlbumCollection();

    const collection = AlbumSerializer.toAlbumCollection(responseData, SampleData.wrestlerNames());

    const displayableAlubms = collection.albums().filter((album) => {
      return album.isDisplayable;
    });

    const picture = displayableAlubms[0]!.pictures()[0]!;

    console.log(picture.displayInfo.contributor);
    expect(picture.displayInfo.contributor.displayName).not.toBeUndefined();
  });

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
