import { TSource, ISourceCollection } from 'app/wrespic';
import { TWrestlerName } from 'app/core/wreslter';
import { SourceLoader } from './sourceLoader';

export class SourceCollection implements ISourceCollection {
  private _sources: TSource[] = [];

  async load(names: TWrestlerName[]): Promise<void> {
    const loader = new SourceLoader();
    this._sources = await loader.load(names);
  }

  rebuild(sources: TSource[]) {
    this._sources = sources;
  }

  filterFromSelected(targetNames: TWrestlerName[]): TSource[] {
    let sources: TSource[] = [];

    this._sources.forEach((source) => {
      targetNames.forEach((name) => {
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
}
