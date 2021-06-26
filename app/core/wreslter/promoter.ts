import { IPromoter, TPromoterName, IWrestlerName } from 'app/core/wreslter';
import { SampleData } from 'sampleData';

export class Promoter implements IPromoter {
  constructor(
    readonly name: TPromoterName,
    readonly hashtag: string,
    readonly memberNames: IWrestlerName[]
  ) {}

  isBelongTo(wreslerName: IWrestlerName): boolean {
    const memberName = this.memberNames.find((name) => {
      return name.equal(wreslerName);
    });

    return memberName !== undefined;
  }

  // MVP開発用
  static buildMarvelous() {
    const name: TPromoterName = { shortName: 'Marvelous' };

    const memberNames = SampleData.wrestlerNames();

    return new this(name, 'Marvelouspro', memberNames);
  }
}
