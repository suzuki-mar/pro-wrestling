import * as _ from 'loadsh';
import { Wrestler } from 'app/core/wreslter/wrestler';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { TWrestlerPictureURL } from 'app/wrespic';
import { IWrestlerName, IWrestler } from 'app/core/wreslter';
import { SampleData } from '../sampleData';
import faker from 'faker';

export class WrestlerData {
  static names(): IWrestlerName[] {
    const nameStrs = ['彩羽匠', '桃野美桜', '門倉凛', '神童ミコト', 'Maria', '星月芽依', '宝山愛'];

    const names: WrestlerName[] = _.map(nameStrs, (str: string) => {
      // タイプを定義しやすくするために一時変数に代入している
      const name = new WrestlerName(str);
      return name;
    });

    return _.shuffle(names);
  }

  // nameはビルトインメソッドと名前が衝突してしまうため使用していない
  static wrestlerName(): IWrestlerName {
    return this.names()[0]!;
  }

  static wrestlers(): IWrestler[] {
    return _.map(this.names(), (name: WrestlerName) => {
      return new Wrestler(name);
    });
  }

  static pictureURL(): TWrestlerPictureURL {
    const pictureURL: TWrestlerPictureURL = {
      name: this.wrestlerName(),
      urlStr: SampleData.url().href,
      date: faker.datatype.datetime(),
    };
    return pictureURL;
  }
}
