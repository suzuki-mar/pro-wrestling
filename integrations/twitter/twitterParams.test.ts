import { TwitterMediaType } from 'integrations/twitter';
import { TwitterParams } from 'integrations/twitter/twitterParams';

describe('toHash', () => {
  let params: TwitterParams;
  let baseParams: {};

  beforeEach(() => {
    params = new TwitterParams();

    baseParams = {
      'tweet.fields': ['entities', 'created_at', 'author_id'],
      expansions: ['author_id', 'entities.mentions.username'],
      'user.fields': ['entities'],
    };
  });

  it('デフォルトのパラメーターを作ること', () => {
    expect(params.toHash()).toEqual(baseParams);
  });

  it('カウントの設定をしてある場合', () => {
    params.setCountMax();

    const expected = Object.assign(baseParams, { max_results: 100 });
    expect(params.toHash()).toEqual(expected);
  });

  it('startの設定をしてある場合', () => {
    params.setStartTime(new Date('2021-11-11 11:11:11'));

    const expected = Object.assign(baseParams, { start_time: '2021-11-11T11:11:11+09:00' });
    expect(params.toHash()).toEqual(expected);
  });

  it('Image用のパラメーターを作ること', () => {
    params.setMediaType(TwitterMediaType.IMAGES);

    let expected = Object.assign(baseParams, { 'media.fields': ['media_key', 'type', 'url'] });
    expected['expansions'].push('attachments.media_keys');

    expect(params.toHash()).toEqual(expected);
  });
});

export {};
