import { IWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';

export class VModelCreator {
  static buildWreslerName(params: {}): IWrestlerName {
    return new WrestlerName(params.full);
  }
}
