import { ResponseData } from 'sampleData/responseData';
import { WrestlerCollection } from './models/wrestlerCollection';
import { WrestlerSerializer } from './wrestlerSerializer';

describe('WrestlerSerializer', () => {
  describe('toWrestlerCollection', () => {
    it('シリアライズできること', () => {
      const responseData = ResponseData.fetchWrestlerCollection();
      const collection = WrestlerSerializer.toWrestlerCollection(responseData);
      expect(collection).toBeInstanceOf(WrestlerCollection);
    });
  });
});
