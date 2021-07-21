import { TwitterQueryOperator, TwitterFiliter, ITwitterHashtag } from 'integrations/twitter';
import { TwitterParams } from 'integrations/twitter/params';
import { TwitterHashtag } from 'integrations/twitter/twitterHashtag';
import * as _ from 'lodash';

describe('toQuery', () => {
  let params: TwitterParams;
  beforeEach(() => {
    params = new TwitterParams();
    // 余計な文字列が含まれないようにするため
    params.setIncldueRT();
  });

  it('値がセットされていない場合は空の配列を返すこと', () => {
    expect(params.toQuery()).toEqual('');
  });

  describe('ハッシュタグの設定', () => {
    it('1つだけセットされている場合にQueryの正しくできていること', () => {
      params.addHashTag(buildHashTag());
      expect(params.toQuery()).toEqual('(#Hoge AND #Fuga)');
    });

    it('複数設定されている場合に場合にQueryが正しくできていること', () => {
      _.times(2, () => {
        params.addHashTag(buildHashTag());
      });

      expect(params.toQuery()).toEqual('(#Hoge AND #Fuga) OR (#Hoge AND #Fuga)');
    });
  });

  describe('フィルターの設定', () => {
    it('フィルターが正しく設定されていること', () => {
      params.addFilter(TwitterFiliter.IMAGES);
      expect(params.toQuery()).toEqual('filter:images');
    });
  });

  it('値が全種類セットされている場合でも正しくパラメータを作成できること', () => {
    _.times(2, () => {
      params.addHashTag(buildHashTag());
    });

    params.addFilter(TwitterFiliter.IMAGES);
    expect(params.toQuery()).toEqual('(#Hoge AND #Fuga) OR (#Hoge AND #Fuga) filter:images');
  });
});

describe('TwitterHashTag', () => {
  it('複数の文字列があるハッシュタグを生成する', () => {
    const hashTag = buildHashTag().addString('Piyo', TwitterQueryOperator.OR);
    hashTag
      .initialize('Hoge')
      .addString('Fuga', TwitterQueryOperator.AND)
      .addString('Piyo', TwitterQueryOperator.OR);
    expect(hashTag.toString()).toEqual('#Hoge AND #Fuga OR #Piyo');
  });
});

function buildHashTag(): ITwitterHashtag {
  const hashTag = new TwitterHashtag();
  return hashTag.initialize('Hoge').addString('Fuga', TwitterQueryOperator.AND);
}

export {};
