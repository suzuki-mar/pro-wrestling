import { render } from 'test/utils';

import { WreslterSelection } from 'app/wrespic/components/wrestlerSelection';
import useFavoriteWrestlers from 'app/wrespic/hooks/useFavoriteWrestlers';
import { SampleData } from 'db/sampleData';
import { WrestlerName } from 'app/core/wreslter/interface';

jest.mock('app/wrespic/hooks/useFavoriteWrestlers');
const mockUseFavoriteWrestlers = useFavoriteWrestlers as jest.MockedFunction<
  typeof useFavoriteWrestlers
>;

test('クエリーが実行されていること', () => {
  mockUseFavoriteWrestlers.mockReturnValue(SampleData.wrestlers());

  const rendered = render(<WreslterSelection />);

  const name: WrestlerName = SampleData.wrestlerNames()[0] as WrestlerName;
  rendered.getByText(name.full);
});
