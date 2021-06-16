import { render } from 'test/utils';

import { WreslterSelection } from 'app/wrespic/components/wrestlerSelection';
import useFavoriteWrestlers from 'app/wrespic/hooks/useFavoriteWrestlers';
import { TestData } from 'test/testData';

jest.mock('app/wrespic/hooks/useFavoriteWrestlers');
const mockUseFavoriteWrestlers = useFavoriteWrestlers as jest.MockedFunction<
  typeof useFavoriteWrestlers
>;

test('クエリーが実行されていること', () => {
  mockUseFavoriteWrestlers.mockReturnValue(TestData.marvelousWrestlers());

  const rendered = render(<WreslterSelection />);

  const name = TestData.marvelousWrestlerNames()[0] as string;
  rendered.getByText(name);
});
