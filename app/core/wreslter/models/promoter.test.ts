import { Promoter } from 'app/core/wreslter/models/promoter';
import { SampleData } from 'sampleData';
import { WrestlerName } from 'app/core/wreslter/models/wrestlerName';

describe('Promoter', () => {
  describe('isBelongTo', () => {
    it('所属している場合はtrueを返す', () => {
      const promoter = Promoter.buildMarvelous();
      expect(promoter.isBelongTo(SampleData.wrestlerName())).toBeTruthy();
    });

    it('所属していない場合はfalseを返す', () => {
      const promoter = Promoter.buildMarvelous();
      const name = new WrestlerName('not exists');

      expect(promoter.isBelongTo(name)).toBeFalsy();
    });
  });
});
export {};
