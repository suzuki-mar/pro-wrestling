import { Wrestler } from 'app/core/wreslter/wrestler';
import { SampleData } from 'sampleData';

describe('Wrestler', () => {
  describe('creates', () => {
    it('作成できていること', async () => {
      const names = SampleData.wrestlerNames();
      const wrestlers = await Wrestler.creates(names);

      console.log(SampleData.wrestlers());

      expect(wrestlers[0]).toBeInstanceOf(Wrestler);
    });
  });
});
export {};
