import { TWrestlerName } from 'app/core/wreslter';

export class WrestlerName implements TWrestlerName {
  constructor(readonly full: string, readonly unique: boolean) {}
  equal(compare: TWrestlerName): boolean {
    return compare.full === this.full;
  }
}
