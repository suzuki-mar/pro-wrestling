import * as _ from 'loadsh';
import { Wrestler } from 'app/core/wreslter/wrestler';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { TSource } from 'app/wrespic';
import { IWrestlerName, IWrestler } from 'app/core/wreslter';
import { SampleData } from '../sampleData';
import faker from 'faker';

export class WrestlerData {
  static names(): IWrestlerName[] {
    const nameParams = [
      { name: '彩羽匠', id: 1 },
      { name: '桃野美桜', id: 2 },
      { name: '門倉凛', id: 3 },
      { name: '神童ミコト', id: 4 },
      { name: 'Maria', id: 5 },
      { name: '星月芽依', id: 6 },
      { name: '宝山愛', id: 7 },
    ];

    const names: WrestlerName[] = _.map(nameParams, (params) => {
      // タイプを定義しやすくするために一時変数に代入している
      const name = new WrestlerName(params.name, params.id);
      return name;
    });

    return _.shuffle(names);
  }

  // nameはビルトインメソッドと名前が衝突してしまうため使用していない
  static wrestlerName(): IWrestlerName {
    return this.names()[0]!;
  }

  static wrestlers(): IWrestler[] {
    let wrestlers = _.map(this.names(), (name: WrestlerName) => {
      return new Wrestler(name);
    });

    return wrestlers;
  }

  static pictureURL(): TSource {
    const pictureURL: TSource = {
      name: this.wrestlerName(),
      urlStr: SampleData.url().href,
      date: faker.datatype.datetime(),
    };
    return pictureURL;
  }
}
