import * as _ from 'loadsh';
import { Wrestler } from 'app/core/wreslter/wrestler';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { TWrestlerPictureURL } from 'app/wrespic';
import { TWrestlerName, IWrestler } from 'app/core/wreslter';
import { TPictureTweet, TTweet, TweetType } from 'integrations/twitter/interface';
import faker from 'faker';

export class SampleData {
  static wrestlerNames(): TWrestlerName[] {
    const nameStrs = ['彩羽匠', '桃野美桜', '門倉凛', '神童ミコト', 'Maria', '星月芽依', '宝山愛'];

    const names: WrestlerName[] = _.map(nameStrs, (str: string) => {
      // タイプを定義しやすくするために一時変数に代入している
      const name = new WrestlerName(str);
      return name;
    });

    return _.shuffle(names);
  }

  static wrestlerName(): TWrestlerName {
    return this.wrestlerNames()[0]!;
  }

  static wrestlers(): IWrestler[] {
    return _.map(this.wrestlerNames(), (name: WrestlerName) => {
      return new Wrestler(name);
    });
  }

  static wrestlerPictureURL(): TWrestlerPictureURL {
    const pictureURL: TWrestlerPictureURL = { name: this.wrestlerName(), urlStr: this.url().href };
    return pictureURL;
  }

  static url(): URL {
    const urlStrs = [
      'https://pbs.twimg.com/profile_images/1379722405220782080/GPA5Q9M-_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1306992114270527489/j2rjqGMg_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1370429023579348992/xijhpU9c_400x400.jpg',
      'https://pbs.twimg.com/profile_images/1065855408378601472/5QteaT_0_400x400.jpg',
    ];
    const urlStr = _.shuffle(urlStrs)[0];
    return new URL(urlStr);
  }

  static tweets(): TTweet[] {
    const wreslerNames = this.wrestlerNames();
    let tweets = this.pictureTweets() as TTweet[];
    tweets.push({
      id: faker.datatype.number(),
      text: faker.lorem.text(),
      type: TweetType.TextOnly,
      hashtags: [faker.lorem.slug(), wreslerNames[0]!.full],
    });

    return tweets;
  }

  static pictureTweets(): TPictureTweet[] {
    const names = this.wrestlerNames().slice(0, 2);

    return [
      {
        id: faker.datatype.number(),
        text: faker.lorem.text(),
        pictureURL: faker.image.imageUrl(),
        hashtags: [faker.lorem.slug(), names[0]!.full],
        type: TweetType.Picture,
      },

      {
        id: faker.datatype.number(),
        text: faker.lorem.text(),
        pictureURL: faker.image.imageUrl(),
        hashtags: [faker.lorem.slug(), names[0]!.full, names[1]!.full],
        type: TweetType.Picture,
      },
    ];
  }
}
