import { ISelectedWrestlers } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import * as _ from 'loadsh';

export class SelectedWrestlers implements ISelectedWrestlers {
  private _names: TWrestlerName[] = [];

  select(name: WrestlerName): TWrestlerName[] {
    if (this.isSelected(name)) {
      console.warn('同じレスラーを追加しようとした');
      return this._names;
    }

    this._names = [...this._names, name];

    return this._names;
  }

  deselect(target: WrestlerName): TWrestlerName[] {
    return _.remove(this._names, (name: WrestlerName) => {
      return target.equal(name);
    });
  }

  isSelected(name: WrestlerName): boolean {
    const sameName = this._names.find((n) => {
      return n.equal(name);
    });

    return sameName !== undefined;
  }

  names(): TWrestlerName[] {
    return this._names;
  }

  rebuild(wreslerNames: TWrestlerName[]) {
    this._names = [];

    wreslerNames.forEach((name: TWrestlerName) => this.select(name));
  }
}
