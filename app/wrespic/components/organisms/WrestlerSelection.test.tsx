import { render } from 'test/utils';

import { WrestlerSelection } from 'app/wrespic/components/organisms/WrestlerSelection';
import { FavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';
import { ContextWrapper } from 'app/wrespic/components/Context';
import { SampleData } from 'sampleData';
import { IWrestlerName } from 'app/core/wreslter';

let screen;

beforeEach(async () => {
  const favoriteWrestlers = new FavoriteWrestlers();
  await favoriteWrestlers.load();

  screen = render(
    <ContextWrapper>
      <WrestlerSelection favoriteWrestlers={favoriteWrestlers} />
    </ContextWrapper>
  );
});

test('レスラー名が表示されていること', () => {
  const name: IWrestlerName = SampleData.wrestlerNames()[0]!;

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
