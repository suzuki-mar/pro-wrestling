import { IWrestlerCollection, TWrestlerName } from 'app/wreslters';
import { Wrestler } from './domains/models/wrestler';
import { WrestlerCollection } from './domains/models/wrestlerCollection';
import { WrestlerName } from './domains/models/wrestlerName';

export class WrestlerSerializer {
  static toWrestlerCollection(params: {}): IWrestlerCollection {
    const wrelsers = params['_wrestlers'].map((param) => {
      const wrelserName = this.toWreslerName(param['name']);
      return Wrestler.build(param['id'], wrelserName);
    });

    return WrestlerCollection.rebuild(wrelsers);
  }

  static toWreslerName(params: {}): TWrestlerName {
    const unique = params['unique'] === 'true';
    return new WrestlerName(params['full'], unique);
  }
}
