import { IContest } from 'app/contests';
import { IPromoter, TWrestlerName } from 'app/core/wreslter';

export class Contest implements IContest {
  constructor(
    readonly _date: Date,
    readonly _title: string,
    readonly _promoter: IPromoter,
    readonly _participants: TWrestlerName[]
  ) {}

  date(): Date {
    return this._date;
  }

  title(): string {
    return this._title;
  }

  promoter(): IPromoter {
    return this._promoter;
  }

  participants(): TWrestlerName[] {
    return this._participants;
  }
}
