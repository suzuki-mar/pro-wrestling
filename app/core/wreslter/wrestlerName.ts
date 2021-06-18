import { TWrestlerName } from 'app/core/wreslter/interface';

export class WrestlerName implements TWrestlerName {
  constructor(readonly full: string) {}
  equal(compare: TWrestlerName): boolean {
    return compare.full === this.full;
  }
}
