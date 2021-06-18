import * as _ from 'loadsh';
import { Wrestler } from 'app/core/wreslter/wrestler';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { TWrestlerPictureURL } from 'app/wrespic';

export class SampleData {
  static wrestlerNames(): WrestlerName[] {
    const nameStrs = ['彩羽匠', '桃野美桜', '門倉凛', '神童ミコト', 'Maria', '星月芽依', '宝山愛'];

    const names: WrestlerName[] = _.map(nameStrs, (str: string) => {
      // タイプを定義しやすくするために一時変数に代入している
      const name = new WrestlerName(str);
      return name;
    });

    return _.shuffle(names);
  }

  static wrestlerName(): WrestlerName {
    return this.wrestlerNames()[0] as WrestlerName;
  }

  static wrestlers(): Wrestler[] {
    return _.map(this.wrestlerNames(), (name: WrestlerName) => {
      return new Wrestler(name);
    });
  }

  static wrestlerPictureURL(): TWrestlerPictureURL {
    const pictureURL: TWrestlerPictureURL = { name: this.wrestlerName(), url: this.url() };
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
}
