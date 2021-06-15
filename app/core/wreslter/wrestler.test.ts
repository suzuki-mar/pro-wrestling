import { Wrestler } from 'app/core/wreslter/wrestler';

describe('Wrestler', () => {
  describe('name', () => {
    it('名前を返す', () => {
      const wrestler = new Wrestler('星月芽依');
      expect(wrestler.name()).toEqual('星月芽依');
    });
  });
});
export {};
