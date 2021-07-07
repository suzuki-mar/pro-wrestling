import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { SelectedWrestlers } from 'app/wrespic/domain/selectedWrestlers';
import { SampleData } from 'sampleData';

describe('SelectedWrestlers', () => {
  describe.skip('search ＆ pictureUrls', () => {
    it('レスラー名と写真の組み合わせを取得すること', async () => {
      const wreslers = SampleData.wrestlers();

      const selectedWrestlers = new SelectedWrestlers();
      wreslers.forEach((wresler) => {
        selectedWrestlers.selectWreslerName(wresler.name as WrestlerName);
      });

      await selectedWrestlers.searchFromTwitter();

      const wrestlerPicuteURLs = selectedWrestlers.pictureUrls();

      // FIX テストを充実させたい
      expect(wrestlerPicuteURLs.length).toEqual(3);
    });
  });

  describe('selectWresler', () => {
    it('選択したレスラーをリストに追加すること', () => {
      const selectedWrestlers = new SelectedWrestlers();

      const wreslerName = SampleData.wrestlerName();
      const result = selectedWrestlers.selectWreslerName(wreslerName);

      expect(result[0]!).toEqual(wreslerName);
      expect(result).toEqual(selectedWrestlers.names());
    });

    it('すでに選択しているレスラーはリストに追加しないこと', () => {
      const selectedWrestlers = new SelectedWrestlers();

      const name = SampleData.wrestlerName();
      selectedWrestlers.selectWreslerName(name);
      const result = selectedWrestlers.selectWreslerName(name);

      expect(result.length).toEqual(1);
    });
  });
});
export {};
