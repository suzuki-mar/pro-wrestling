import { WrestlerSelection } from 'app/wrespic/components/organisms/WrestlerSelection';
import { ExecutionLog } from 'app/wrespic/components/executionLlog';
import { Header } from 'app/wrespic/components/organisms/header';
import { useFavoriteWrestlers, useSelectedWrestlers } from 'app/wrespic/hooks';

export function Wrespic() {
  const favoriteWrestlers = useFavoriteWrestlers();

  return (
    <div className="grid justify-items-center h-96 w-10/12 ...">
      <Header />

      <WrestlerSelection
        favoriteWrestlers={favoriteWrestlers}
        selectedWrestlers={useSelectedWrestlers()}
      />

      <ExecutionLog />
    </div>
  );
}
