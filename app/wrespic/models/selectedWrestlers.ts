import { TSource, ISelectedWrestlers } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { SourceSearcher } from './sourceSearcher';
import * as _ from 'loadsh';

export class SelectedWrestlers implements ISelectedWrestlers {
  private _sources: TSource[] = [];
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

    wreslerNames.forEach((name: TWrestlerName) => this.select(name));
    this._sources = sources;
  }
}
