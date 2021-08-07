import { TWrestlerName } from 'app/wreslters';

export class WrestlerName implements TWrestlerName {
  constructor(readonly full: string, readonly unique: boolean) {}
  equal(compare: TWrestlerName): boolean {
    return compare.full === this.full;
  }
}
