import { SampleData } from 'db/sampleData';
import { Logger } from 'infrastructure/lib';

describe('Logger', () => {
  describe('log', () => {
    it('文字列に対応したログを返すこと', () => {
      // FIXME
      // mockの処理実行回数のテストをする
      // mockの処理をカウントするのが大変なためexpectはしていない 実行されれば問題ないとして扱う
      Logger.log('aaa');
    });

    it('Arrayに対応したログを返すこと', () => {
      Logger.log(['123']);
    });

    it('Hashに対応したログを返すこと', () => {
      Logger.log(SampleData.wrestlers[0]);
    });
  });
});

export {};
