import { Wrestler } from 'app/core/wreslter/models/wrestler';
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
      const wrestler = Wrestler.build(0, name);
      expect(wrestler.name.equal(name)).toBeTruthy();
      expect(wrestler.currentBelongsPromoterName).not.toBeUndefined();
    });
  });
});
export {};
