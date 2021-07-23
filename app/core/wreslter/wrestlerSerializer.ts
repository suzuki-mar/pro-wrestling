import { IWrestlerCollection, TWrestlerName } from 'app/core/wreslter';
import { Wrestler } from './models/wrestler';
import { WrestlerCollection } from './models/wrestlerCollection';
import { WrestlerName } from './models/wrestlerName';

export class WrestlerSerializer {
  static toWrestlerCollection(params: {}): IWrestlerCollection {
    const wrelsers = params['_wrestlers'].map((param) => {
      const wrelserName = this.toWreslerName(param['name']);
      return Wrestler.build(param['id'], wrelserName);
    });

    return WrestlerCollection.rebuild(wrelsers);
  }

  static toWreslerName(params: {}): TWrestlerName {
    return new WrestlerName(params['full']);
  }
}
