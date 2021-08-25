import { TPictureTweet, TTextOnlyTweet, TUserID } from 'integrations/twitter';
import { IWrestler, TWrestlerName } from 'app/wreslters';

import { IWrestlerRepository, IWrestlerQuery } from 'app/wreslters/domains/type';

import { IPictureRepository, PictureURLWithWrestlerNames } from 'app/albums/domains/models/type';

import { ITweetRepository } from 'app/core/tweet/interface';

import { SampleData } from 'sampleData';
import { TwitterID } from 'integrations/twitter/twitterID';
import { TPictureURL } from 'app/albums';

export class MockWrestlerRepository implements IWrestlerRepository {
  async fetchAll(): Promise<IWrestler[]> {
    return SampleData.wrestlers();
  }

  async fetchByName(name: TWrestlerName): Promise<IWrestler> {
    return SampleData.wrestler();
  }

  async add(names: TWrestlerName): Promise<IWrestler> {
    return SampleData.wrestler();
  }
}

export class MockWrestlerQuery implements IWrestlerQuery {
  async findNames(): Promise<TWrestlerName[]> {
    return SampleData.wrestlerNames();
  }
}

export class MockPictureRepository implements IPictureRepository {
  async fetchWrestlerNames(pictureURLs: TPictureURL[]): Promise<PictureURLWithWrestlerNames[]> {
    return [SampleData.pictureURLWithWrestlerNames()];
  }
}

export class MockTweetRepository implements ITweetRepository {
  async fetchPictureTweetByWrestlerNames(): Promise<TPictureTweet[]> {
    return SampleData.pictureTweets();
  }

  async fetchPictureTweetsByIds(): Promise<TPictureTweet[]> {
    return SampleData.pictureTweets();
  }

  async fetchOnlyTweetsFromSinceTimeByUserIds(
    since: Date,
    userIDs: TUserID[]
  ): Promise<TTextOnlyTweet[]> {
    const tweets = SampleData.textTweets();
    const rinsaiTweet = tweets[0]!;

    rinsaiTweet.urls = [
      {
        description: '10分1500円。選手独占！各時間帯チケット限定1枚！先着順！',
        title: '8/9 桃野美桜　オンラインリングサイド　',
        urlStr: 'https://passmarket.yahoo.co.jp/event/show/detail/0141971tcfu11.html',
      },
    ];
    return tweets;
  }

  async fetchUserIDsThatFollowsRegularly(): Promise<TUserID[]> {
    return [{ name: 'Mio0207415' }, { name: 'mei_marvelous' }];
  }

  fetchDefaultLoadingIDs(): TwitterID[] {
    return [TwitterID.build('123')];
  }
}
