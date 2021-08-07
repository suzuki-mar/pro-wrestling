import { SampleData } from 'sampleData';
import { ResponseData } from 'sampleData/responseData';
import { AlbumKinds } from '.';
import { AlbumSerializer } from './albumSerializer';

describe('toAlbumCollection', () => {
  it('displayInfoのシリアライズができていること', () => {
    const responseData = ResponseData.fetchAlbumCollection();

    const collection = AlbumSerializer.toAlbumCollection(responseData, SampleData.wrestlerNames());

    const displayableAlubms = collection.allAlbums().filter((album) => {
      return album.isDisplayable;
    });

    const picture = displayableAlubms[0]!.pictures()[0]!;
    expect(picture.displayInfo.contributor.displayName).not.toBeUndefined();
  });

  it('PictureURLのシリアライズできていること', () => {
    const responseData = ResponseData.fetchAlbumCollection();

    const collection = AlbumSerializer.toAlbumCollection(responseData, SampleData.wrestlerNames());

    const displayableAlubms = collection.allAlbums().filter((album) => {
      return album.isDisplayable;
    });

    const picture = displayableAlubms[0]!.pictures()[0]!;

    expect(picture.pictureURL.defaultSizeURL).not.toBeUndefined();
  });

  it('表示するアルバムに団体のアルバムがセットされていること', () => {
    const responseData = ResponseData.fetchAlbumCollection();
    const collection = AlbumSerializer.toAlbumCollection(responseData, SampleData.wrestlerNames());
    const selectedKind = collection.currentSelectedAlbums()[0]!.type()!.kind();
    expect(selectedKind).toEqual(AlbumKinds.Promoter);
  });
});
