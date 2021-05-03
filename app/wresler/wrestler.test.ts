import { Source } from 'app/contents/source';
import { Wrestler } from '../../app/wresler/wrestler';

describe('Wrestler', () => {
  describe('isPerforming', () => {
    const wrestler = new Wrestler('星月芽依');

    it('レスラーの名前があるときはtrueを返す', () => {
      const source = new Source(
        '第2代目テンてん！プロレスラーあるある！大食い企画ー！！桃野美桜&星月芽依マーベラスプロレス'
      );
      expect(wrestler.isPerforming(source)).toBeTruthy();
    });

    it('レスラーの名前がないときはfalseを返す', () => {
      const source = new Source('女子プロレスラーが荒野行動やってみた！');
      expect(wrestler.isPerforming(source)).toBeFalsy();
    });
  });
});
export {};
