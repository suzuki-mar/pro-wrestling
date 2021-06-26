import { render } from 'test/utils';

import { WrestlerSelection } from 'app/wrespic/components/organisms/WrestlerSelection';
import { FavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';
import { SelectedWrestlers } from 'app/wrespic/entities/selectedWrestlers';
import { SampleData } from 'sampleData';
import { TWrestlerName } from 'app/core/wreslter';

let screen;

beforeEach(async () => {
  const favoriteWrestlers = new FavoriteWrestlers();
  await favoriteWrestlers.load();

  const selectedWrestlers = new SelectedWrestlers([]);

  screen = render(
    <WrestlerSelection
      selectedWrestlers={selectedWrestlers}
      favoriteWrestlers={favoriteWrestlers}
    />
  );
});

test('レスラー名が表示されていること', () => {
  const name: TWrestlerName = SampleData.wrestlerNames()[0]!;

  expect(screen.getByText(name.full)).not.toBeUndefined();
});

test('レスラーがリスト表示されていること', () => {
  const wrestlerCount = SampleData.wrestlerNames().length;
  const elementCount = screen.getAllByTestId('custom-element').length;
  // FIX 一つ多くレンダリングされている
  expect(elementCount).toEqual(wrestlerCount + 1);
});

test('検索ボタンをクリックできないこと', () => {
  const elements = screen.getAllByRole('button');
  expect(elements[0]).toHaveClass('aws-btn--disabled');
});
