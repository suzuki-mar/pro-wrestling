import { IPromoter, TPromoterName, TWrestlerName } from 'app/core/wreslter';
import { SampleData } from 'sampleData';

export class Promoter implements IPromoter {
  constructor(
    readonly name: TPromoterName,
    readonly hashtag: string,
    readonly memberNames: TWrestlerName[]
  ) {}

  isBelongTo(wreslerName: TWrestlerName): boolean {
    const memberName = this.memberNames.find((name) => {
      return name.equal(wreslerName);
    });

    return memberName !== undefined;
  }

  // マーベラスしか対応しない予定なので
  static buildMarvelous() {
    const name: TPromoterName = { shortName: 'Marvelous' };

    const memberNames = SampleData.wrestlerNames();

    return new this(name, 'Marvelouspro', memberNames);
  }
}
