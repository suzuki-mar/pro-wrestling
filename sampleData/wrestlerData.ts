import { Wrestler } from 'app/core/wreslter/models/wrestler';
import { WrestlerName } from 'app/core/wreslter/models/wrestlerName';
import { TWrestlerName, IWrestler } from 'app/core/wreslter';
import { SampleData } from '../sampleData';

export class WrestlerData {
  static names(): TWrestlerName[] {
    const nameParams = [
      { name: '彩羽匠', unique: true },
      { name: SampleData.mioName().full, unique: true },
      { name: '門倉凛', unique: true },
      { name: '神童ミコト', unique: true },
      { name: SampleData.mariaName().full, unique: false },
      { name: SampleData.meiName().full, unique: true },
      { name: '宝山愛', unique: true },
    ];

    const names: WrestlerName[] = nameParams.map((params) => {
      // タイプを定義しやすくするために一時変数に代入している
      const name = new WrestlerName(params.name, params.unique);
      return name;
    });

    return names;
  }

  // n ameはビルトインメソッドと名前が衝突してしまうため使用していない
  static wrestlerName(): TWrestlerName {
    return this.names()[0]!;
  }

  static wrestlers(): IWrestler[] {
    let wrestlers = this.names().map((name: WrestlerName, index: number) => {
      return new Wrestler(index, name);
    });

    return wrestlers;
  }
}
