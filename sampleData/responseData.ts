import { SampleData } from 'sampleData';

export class ResponseData {
  static fetchWrestlerCollection(): any {
    const wrestlerCollection = SampleData.wrestlerCollection();
    return this.convertJSON(wrestlerCollection);
  }

  static fetchAlbumCollection(): any {
    const albumCollection = SampleData.albumCollection(SampleData.wrestlerNames());
    return this.convertJSON(albumCollection);
  }

  private static convertJSON(target: any) {
    const str = JSON.stringify(target);
    return JSON.parse(str);
  }
}
