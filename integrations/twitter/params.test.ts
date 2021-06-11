import { TwitterQueryOperator, TwitterFiliter } from './interface';
import { TwitterParams } from './params';

describe('toHash', () => {
  let params: TwitterParams;
  beforeEach(() => {
    params = new TwitterParams();
  });

  it('値がセットされていない場合は空の配列を返すこと', () => {
    expect(params.toHash()).toEqual({});
  });

  describe('ハッシュタグの設定', () => {
    it('1つだけセットされている場合にQueryの正しくできていること', () => {
      params.initializeHashtaGroup('STARDOM');
      expect(params.toHash()).toEqual({ q: '(#STARDOM)' });
    });

    it('複数設定されている場合に場合にQueryが正しくできていること', () => {
      params
        .initializeHashtaGroup('STARDOM')
        .addHashTag('中野たむ', TwitterQueryOperator.AND)
        .addHashTag('SLK', TwitterQueryOperator.OR);
      expect(params.toHash()).toEqual({ q: '(#STARDOM AND #中野たむ OR #SLK)' });
    });
  });

  describe('フィルターの設定', () => {
    it('フィルターが正しく設定されていること', () => {
      params.addFilter(TwitterFiliter.IMAGES);
      expect(params.toHash()).toEqual({ q: 'filter:images' });
    });
  });

  it('値が全種類セットされている場合でも正しくパラメータを作成できること', () => {
    params
      .addFilter(TwitterFiliter.IMAGES)
      .initializeHashtaGroup('STARDOM')
      .addHashTag('中野たむ', TwitterQueryOperator.AND);
    expect(params.toHash()).toEqual({ q: '(#STARDOM AND #中野たむ) filter:images' });
  });
});

export {};
