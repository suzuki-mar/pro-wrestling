import { useBuildDomainModels } from 'app/wrespic/states/hooks/useBuildDomainModels';
import { Header } from 'app/wrespic/components/Header';
import { AlbumCollectionSection } from 'app/wrespic/components/AlbumCollectionSection';
import { ContextWrapper } from './Context';
import { FavoriteWrestlersList } from 'app/wrespic/components/FavoriteWreslersList';
import { SearchButton } from 'app/wrespic/components/SearchButton';

export function Wrespic() {
  const [favoriteWrestlers, selectedWrestlers, albumCollection] = useBuildDomainModels();

  return (
    <ContextWrapper selectedWrestlers={selectedWrestlers} albumCollection={albumCollection}>
      <Header />

      <div>
        <div className="w-auto grid justify-items-center ...">
          <FavoriteWrestlersList
            favoriteWrestlers={favoriteWrestlers}
            selectedWrestlers={selectedWrestlers}
          />
          <SearchButton selectedWrestlers={selectedWrestlers} albumCollection={albumCollection} />
        </div>
        <AlbumCollectionSection albumCollection={albumCollection} />
      </div>
    </ContextWrapper>
  );
}
