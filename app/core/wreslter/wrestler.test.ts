import { Wrestler } from 'app/core/wreslter/wrestler';
import { SampleData } from 'db/sampleData';

describe('Wrestler', () => {
  describe('name', () => {
    it('名前を返す', () => {
      const name = SampleData.marvelousWrestlerName();
      const wrestler = new Wrestler(name);
      expect(wrestler.name).toEqual(name);
    });
  });

  describe('creates', () => {
    it('作成できていること', async () => {
      const names = SampleData.marvelousWrestlerNames();
      const wrestlers = await Wrestler.creates(names);
      expect(wrestlers[0]).toBeInstanceOf(Wrestler);
    });
  });
});
export {};
