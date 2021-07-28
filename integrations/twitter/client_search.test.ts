import { Client } from 'integrations/twitter/client';
import { TwitterFiliter, TPictureTweet } from 'integrations/twitter';
import { TwitterParams } from 'integrations/twitter/params';
import { TwitterHashtag } from 'integrations/twitter/twitterHashtag';
import { TweetFilter } from 'integrations/twitter/tweetFilter';

import dotenv from 'dotenv';
import { SampleData } from 'sampleData';
dotenv.config();

// 外部APIとの接続になるため必要最小限の実行にしている
const client = new Client();
let params: TwitterParams = new TwitterParams();

describe.skip('接続確認', () => {
  beforeEach(() => {
    params.addHashTag(new TwitterHashtag().initialize('Test'));
  });

  it('接続ができること', async () => {
    try {
      await client.search(params);
    } catch (error) {
      expect(false).toBeTruthy();
    }
  });
});

describe('Pictureの画像を取得する場合', () => {
  beforeEach(() => {
    params.addFilter(TwitterFiliter.IMAGES);
    params.addHashTag(new TwitterHashtag().initialize(SampleData.mioName().full));
  });

  it('TypeがPictureのものみ返すこと', async () => {
    params.addCount(1);

    const tweets = await client.search(params);
    const textOnlys = TweetFilter.filterTextOnlys(tweets);
    expect(textOnlys.length).toEqual(0);

    const pictures: TPictureTweet[] = TweetFilter.filterPictures(tweets);
    expect(pictures.length).not.toEqual(0);
  });
});

describe.skip('すべてのタイプを取得する場合', () => {
  it('TypeがPictureのものみ返すこと', async () => {
    params.addHashTag(new TwitterHashtag().initialize(SampleData.meiName().full));

    const tweets = await client.search(params);

    const textOnly = TweetFilter.filterTextOnlys(tweets);
    expect(textOnly.length).not.toEqual(0);

    const picture = TweetFilter.filterPictures(tweets);
    expect(picture.length).not.toEqual(0);
  });
});

describe.skip('RTを含める場合', () => {
  beforeEach(() => {
    params.setIncldueRT();
  });

  it('RTの画像も返されていること', async () => {
    const tweets = await client.search(params);

    const rtweets = TweetFilter.filterRtweets(tweets);
    expect(rtweets.length).not.toEqual(0);
  });
});

describe.skip('RTを含める場合', () => {
  beforeEach(() => {
    params.setIncldueRT();
  });

  it('RTの画像も返されていること', async () => {
    const tweets = await client.search(params);

    const rtweets = TweetFilter.filterRtweets(tweets);
    expect(rtweets.length).not.toEqual(0);
  });
});

describe('エラー処理', () => {
  it('paramsにハッシュタグがない場合はエラーを返すこと', async () => {
    try {
      let params: TwitterParams = new TwitterParams();
      await client.search(params);
      expect(false).toBeTruthy();
    } catch (error) {
      expect(true).toBeTruthy();
    }
  });
});

export {};
