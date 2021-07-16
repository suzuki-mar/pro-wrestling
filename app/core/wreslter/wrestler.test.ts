import { Wrestler } from 'app/core/wreslter/wrestler';
import { SampleData } from 'sampleData';

describe('Wrestler', () => {
  describe('creates', () => {
    it('作成できていること', async () => {
      const names = SampleData.wrestlerNames();
      const wrestlers = await Wrestler.creates(names);
      expect(wrestlers[0]).toBeInstanceOf(Wrestler);
    });
  });

  describe('build', () => {
    it('作成できていること', async () => {
      const name = SampleData.meiName();
      const params = { name: name, id: 0 };
      const wrestler = Wrestler.build(params);
      expect(wrestler.name.equal(name)).toBeTruthy();
      expect(wrestler.currentBelongsPromoterName).not.toBeUndefined();
    });
  });
});
export {};
