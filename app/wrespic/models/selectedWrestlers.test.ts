import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { SelectedWrestlers } from 'app/wrespic/models/selectedWrestlers';
import { SampleData } from 'sampleData';
import { ISelectedWrestlers } from '..';

describe.skip('search ＆ pictureUrls', () => {
  it('レスラー名と写真の組み合わせを取得すること', async () => {
    const wreslers = SampleData.wrestlers();

    const selectedWrestlers = new SelectedWrestlers();
    wreslers.forEach((wresler) => {
      selectedWrestlers.select(wresler.name as WrestlerName);
    });

    await selectedWrestlers.searchFromTwitter();

    const sources = selectedWrestlers.sources();

    // FIX テストを充実させたい
    expect(sources.length).toEqual(3);
  });
});

describe('isSelected', () => {
  let selectedWrestlers: ISelectedWrestlers;

  beforeEach(() => {
    selectedWrestlers = new SelectedWrestlers();
  });

  it('選択されている場合はtrueを返す', () => {
    const name = SampleData.meiName();
    selectedWrestlers.select(name);

    expect(selectedWrestlers.isSelected(name)).toBeTruthy();
  });

  it('選択されている場合はfalseを返す', () => {
    const name = SampleData.meiName();
    expect(selectedWrestlers.isSelected(name)).toBeFalsy();
  });
});

describe('rebuild', () => {
  const selectedWrestlers = new SelectedWrestlers();

  it('JSONからインスタンスを作成すること', async () => {
    const sources = SampleData.sources();

    selectedWrestlers.rebuild([SampleData.meiName()], sources);

    const name = selectedWrestlers.names()[0]!;
    expect(name.equal(SampleData.meiName())).toBeTruthy();
    expect(selectedWrestlers.sources()[0]!.urlStr === sources[0]!.urlStr).toBeTruthy();
  });
});

describe('selectWresler', () => {
  it('選択したレスラーをリストに追加すること', () => {
    const selectedWrestlers = new SelectedWrestlers();

    const wreslerName = SampleData.wrestlerName();
    const result = selectedWrestlers.select(wreslerName);

    expect(result[0]!).toEqual(wreslerName);
    expect(result).toEqual(selectedWrestlers.names());
  });

  it('すでに選択しているレスラーはリストに追加しないこと', () => {
    const selectedWrestlers = new SelectedWrestlers();

    const name = SampleData.wrestlerName();
    selectedWrestlers.select(name);
    const result = selectedWrestlers.select(name);

    expect(result.length).toEqual(1);
  });
});

describe('deselectWresler', () => {
  const selectedWrestlers = new SelectedWrestlers();
  const targetName = SampleData.meiName();

  beforeEach(async () => {
    selectedWrestlers.select(targetName);
  });

  it('指定したレスラーの選択を削除すること', () => {
    selectedWrestlers.deselect(targetName);
    expect(selectedWrestlers.names()).toEqual([]);
  });
});

describe('filterFromSelected', () => {
  const selectedWrestlers = new SelectedWrestlers();

  beforeEach(async () => {
    const wreslers = SampleData.wrestlers();
    wreslers.forEach((wresler) => {
      selectedWrestlers.select(wresler.name as WrestlerName);
    });

    await selectedWrestlers.searchFromTwitter();
  });

  it('指定したレスラーだけ取得すること', () => {
    const beforeCount = selectedWrestlers.sources().length;

    const wreslers = SampleData.wrestlers();
    wreslers.forEach((wresler) => {
      if (!wresler.name.equal(SampleData.meiName())) {
        selectedWrestlers.deselect(wresler.name as WrestlerName);
      }
    });

    const afterCount = selectedWrestlers.filterFromSelected().length;

    expect(afterCount).toBeLessThan(beforeCount);
  });
});

export {};
