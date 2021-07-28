import { SampleData } from 'sampleData';
import { convertJSON } from 'test/lib';

export class ResponseData {
  static fetchWrestlerCollection(): any {
    const wrestlerCollection = SampleData.wrestlerCollection();
    return convertJSON(wrestlerCollection);
  }

  static fetchAlbumCollection(): any {
    const albumCollection = SampleData.albumCollection(SampleData.wrestlerNames());
    return convertJSON(albumCollection);
  }
}
