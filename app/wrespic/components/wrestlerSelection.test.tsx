import { render } from 'test/utils';

import { WreslterSelection } from 'app/wrespic/components/wrestlerSelection';
import useFavoriteWrestlers from 'app/wrespic/hooks/useFavoriteWrestlers';
import { SampleData } from 'db/sampleData';

jest.mock('app/wrespic/hooks/useFavoriteWrestlers');
const mockUseFavoriteWrestlers = useFavoriteWrestlers as jest.MockedFunction<
  typeof useFavoriteWrestlers
>;

test('クエリーが実行されていること', () => {
  mockUseFavoriteWrestlers.mockReturnValue(SampleData.marvelousWrestlers());

  const rendered = render(<WreslterSelection />);

  const name = SampleData.marvelousWrestlerNames()[0] as string;
  rendered.getByText(name);
});
