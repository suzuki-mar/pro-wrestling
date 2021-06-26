import { WrestlerSelection } from 'app/wrespic/components/organisms/WrestlerSelection';
import { Header } from 'app/wrespic/components/organisms/header';
import { useFavoriteWrestlers, useSelectedWrestlers } from 'app/wrespic/hooks';
import { ContextWrapper } from './Context';

export function Wrespic() {
  const favoriteWrestlers = useFavoriteWrestlers();

  return (
    <ContextWrapper>
      <div>
        <Header />

        <WrestlerSelection favoriteWrestlers={favoriteWrestlers} />
      </div>
    </ContextWrapper>
  );
}
