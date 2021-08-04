import { TwitterMediaType } from 'integrations/twitter';
import { TwitterParams } from 'integrations/twitter/twitterParams';

describe('toHash', () => {
  let params: TwitterParams;

  beforeEach(() => {
    params = new TwitterParams();
  });

  it('デフォルトのパラメーターを作ること', () => {
    const expected = {
      'tweet.fields': ['entities', 'created_at', 'author_id'],
      expansions: ['author_id', 'entities.mentions.username'],
      'user.fields': ['entities'],
    };

    expect(params.toHash()).toEqual(expected);
  });

  it('カウントの設定をしてある場合', () => {
    params.setCountMax();

    const expected = {
      'tweet.fields': ['entities', 'created_at', 'author_id'],
      expansions: ['author_id', 'entities.mentions.username'],
      'user.fields': ['entities'],
      max_results: 100,
    };

    expect(params.toHash()).toEqual(expected);
  });

  it('Image用のパラメーターを作ること', () => {
    params.setMediaType(TwitterMediaType.IMAGES);

    const expected = {
      'tweet.fields': ['entities', 'created_at', 'author_id'],
      expansions: ['author_id', 'entities.mentions.username', 'attachments.media_keys'],
      'user.fields': ['entities'],
      'media.fields': ['media_key', 'type', 'url'],
    };

    expect(params.toHash()).toEqual(expected);
  });
});

export {};
