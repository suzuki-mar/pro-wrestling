import * as _ from 'loadsh';
import { TWrestlerPictureURL } from 'app/wrespic';
import { TWrestlerName, IWrestler } from 'app/core/wreslter';
import { TPictureTweet, TTweet } from 'integrations/twitter/interface';
import { WrestlerData } from './wrestlerData';
import { TweetData } from './tweetData';

export class SampleData {
  static wrestlerNames(): TWrestlerName[] {
    return WrestlerData.names();
  }

  static wrestlerName(): TWrestlerName {
    return WrestlerData.wrestlerName();
  }

  static wrestlers(): IWrestler[] {
    return WrestlerData.wrestlers();
  }

  static wrestlerPictureURL(): TWrestlerPictureURL {
    return WrestlerData.pictureURL();
  }

  static imageURLStr(): string {
    const urlStrs = [
      'https://pbs.twimg.com/profile_images/1379722405220782080/GPA5Q9M-_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1306992114270527489/j2rjqGMg_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1370429023579348992/xijhpU9c_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1065855408378601472/5QteaT_0_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1356870860192186370/DqxmMKKZ_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1368942294036967430/xg-Rbmv2_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1163873490052632576/gNdvtfeP_400x400.jpg',
    ];

    return _.shuffle(urlStrs)[0];
  }

  static url(): URL {
    return new URL(this.imageURLStr());
  }

  static tweets(): TTweet[] {
    return TweetData.tweets();
  }

  static pictureTweets(): TPictureTweet[] {
    return TweetData.pictures();
  }
}
