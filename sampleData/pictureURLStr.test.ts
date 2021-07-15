import { SampleData } from '.';
import { PictureURLStr } from './pictureURLStr';

describe('PictureURLStr', () => {
  describe('findByWreslterName', () => {
    it('各選手の画像を取得すること', async () => {
      const names = SampleData.wrestlerNames();
      names.forEach((name) => {
        if (PictureURLStr.findByWreslterName(name) === undefined) {
          // JESTにはfailなどのメソッドが存在しない
          expect(true).toBe(false);
        }
      });
    });
  });
});
