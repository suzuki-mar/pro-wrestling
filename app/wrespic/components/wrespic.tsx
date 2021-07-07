import { WrestlerSelection } from 'app/wrespic/components/wrestler/WrestlerSelection';
import { Header } from 'app/wrespic/components/Header';
import { useLoadFavoriteWrestlers } from 'app/wrespic/states/hooks';
import { AlbumGroup } from 'app/wrespic/components/AlbumGroup';
import { ContextWrapper } from './Context';

export function Wrespic() {
  const favoriteWrestlers = useLoadFavoriteWrestlers();

  return (
    <ContextWrapper>
      <div>
        <Header />

        <WrestlerSelection favoriteWrestlers={favoriteWrestlers} />
        <AlbumGroup />
      </div>
    </ContextWrapper>
  );
}
