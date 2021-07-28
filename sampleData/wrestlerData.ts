import { Wrestler } from 'app/core/wreslter/models/wrestler';
import { WrestlerName } from 'app/core/wreslter/models/wrestlerName';
import { TWrestlerName, IWrestler } from 'app/core/wreslter';
import { SampleData } from '../sampleData';

export class WrestlerData {
  static names(): TWrestlerName[] {
    const nameParams = [
      { name: '彩羽匠' },
      { name: SampleData.mioName().full },
      { name: '門倉凛' },
      { name: '神童ミコト' },
      { name: 'Maria' },
      { name: SampleData.meiName().full },
      { name: '宝山愛' },
    ];

    const names: WrestlerName[] = nameParams.map((params) => {
      // タイプを定義しやすくするために一時変数に代入している
      const name = new WrestlerName(params.name);
      return name;
    });

    return names;
  }

  // nameはビルトインメソッドと名前が衝突してしまうため使用していない
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
