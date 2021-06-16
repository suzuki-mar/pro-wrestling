import { Wrestler } from 'app/core/wreslter/wrestler';
import { TestData } from 'test/testData';

describe('Wrestler', () => {
  describe('name', () => {
    it('名前を返す', () => {
      const name = TestData.marvelousWrestlerName();
      const wrestler = new Wrestler(name);
      expect(wrestler.name).toEqual(name);
    });
  });

  describe('creates', () => {
    it('作成できていること', async () => {
      const names = TestData.marvelousWrestlerNames();
      const wrestlers = await Wrestler.creates(names);
      expect(wrestlers[0]).toBeInstanceOf(Wrestler);
    });
  });
});
export {};
