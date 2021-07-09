import { IWrestlerName } from 'app/core/wreslter';

export class WrestlerName implements IWrestlerName {
  constructor(readonly full: string, readonly id?: number) {}
  equal(compare: IWrestlerName): boolean {
    return compare.full === this.full;
  }
}
