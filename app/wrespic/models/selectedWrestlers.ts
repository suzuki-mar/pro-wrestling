import { TSource, ISelectedWrestlers } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { SourceSearcher } from './sourceSearcher';
import * as _ from 'loadsh';

export class SelectedWrestlers implements ISelectedWrestlers {
  private _sources: TSource[] = [];
  private _names: TWrestlerName[] = [];

  selectWreslerName(name: WrestlerName): TWrestlerName[] {
    const sameNames = this._names.find((n) => {
      return n.equal(name);
    });

    if (sameNames !== undefined) {
      console.warn('同じレスラーを追加しようとした');
      return this._names;
    }

    this._names = [...this._names, name];

    return this._names;
  }

  deselectWreslerName(target: WrestlerName): TWrestlerName[] {
    return _.remove(this._names, (name: WrestlerName) => {
      return target.equal(name);
    });
  }

  async searchFromTwitter(): Promise<void> {
    const searcher = new SourceSearcher();
    this._sources = await searcher.searchFromTwitter(this.names());
  }

  filterFromSelected(): TSource[] {
    let sources: TSource[] = [];

    this.sources().forEach((source) => {
      this.names().forEach((name) => {
        if (source.name.equal(name)) {
          sources = [...sources, source];
        }
      });
    });
    return sources;
  }

  sources(): TSource[] {
    return this._sources;
  }

  names(): TWrestlerName[] {
    return this._names;
  }

  rebuild(wreslerNames: TWrestlerName[], sources: TSource[]) {
    this._names = [];

    wreslerNames.forEach((name: TWrestlerName) => this.selectWreslerName(name));
    this._sources = sources;
  }
}
