import { IPromoter, TPromoterName } from 'app/core/wreslter';

export class Promoter implements IPromoter {
  constructor(readonly name: TPromoterName, readonly hashtag: string) {}

  // MVP開発用
  static buildMarvelous() {
    const name: TPromoterName = { shortName: 'Marvelous' };
    return new this(name, 'Marvelouspro');
  }
}
