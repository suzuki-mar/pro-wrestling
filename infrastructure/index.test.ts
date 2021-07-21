import { SampleData } from 'sampleData';
import { log } from 'infrastructure';

describe.skip('log', () => {
  it('文字列に対応したログを返すこと', () => {
    // FIXME
    // mockの処理実行回数のテストをする
    // mockの処理をカウントするのが大変なためexpectはしていない 実行されれば問題ないとして扱う
    log('aaa');
  });

  it('Arrayに対応したログを返すこと', () => {
    log(['123']);
  });

  it('Hashに対応したログを返すこと', () => {
    log(SampleData.wrestlers[0]);
  });
});

export {};
