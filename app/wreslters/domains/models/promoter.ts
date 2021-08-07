import { IPromoter, TPromoterName, TWrestlerName } from 'app/wreslters';
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

  // 複数団体に対応するときに削除する
  static buildOtherPromoter() {
    const name: TPromoterName = { shortName: 'Other Promotr' };

    const memberNames = [];

    return new this(name, 'Other Promotr', memberNames);
  }
}
