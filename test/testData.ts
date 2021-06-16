import * as _ from 'loadsh';
import { Wrestler } from 'app/sub_contexts/wreslter/wrestler';

export class TestData {
  static marvelousWrestlerNames(): string[] {
    const names = ['彩羽匠', '桃野美桜', '門倉凛', '神童ミコト', 'Maria', '星月芽依', '宝山愛'];
    return _.shuffle(names);
  }

  static marvelousWrestlers(): Wrestler[] {
    return _.map(this.marvelousWrestlerNames(), (name: string) => {
      return new Wrestler(name);
    });
  }
}
