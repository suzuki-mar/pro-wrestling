import { SelectedWrestlers } from 'app/wrespic/entities/selectedWrestlers';
import { SampleData } from 'db/sampleData';

describe('SelectedWrestlers', () => {
  describe('search ＆ pictureUrls', () => {
    it('レスラー名と写真の組み合わせを取得すること', async () => {
      const wreslers = SampleData.wrestlers();

      const selectedWrestlers = new SelectedWrestlers(wreslers);
      await selectedWrestlers.searchFromTwitter();

      const wrestlerPicuteURLs = selectedWrestlers.pictureUrls();

      // FIX テストを充実させたい
      expect(wrestlerPicuteURLs.length).toEqual(3);
    });
  });
});
export {};
