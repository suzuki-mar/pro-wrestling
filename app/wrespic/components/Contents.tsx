import { useFactoryDomainModels } from 'app/wrespic/hooks/useFactoryDomainModels';
import { Header } from 'app/wrespic/components/Header';
import { AlbumCollectionSection } from 'app/wrespic/components/album/AlbumCollectionSection';
import { FavoriteWrestlersList } from 'app/wrespic/components/wrestler/FavoriteWreslersList';
import { SearchButton } from 'app/wrespic/components/SearchButton';
import { useAppStatusReducer } from '../hooks/useAppStatusReducer';

export const Contents: React.VFC = () => {
  const [favoriteWrestlers, selectedWrestlers, albumCollection] = useFactoryDomainModels();
  // const [appStatus, setAppStatus] = useFactoryAppStatus(selectedWrestlers, albumCollection);
  const [appState, dispatch] = useAppStatusReducer(
    selectedWrestlers,
    albumCollection,
    favoriteWrestlers
  );

  return (
    <>
      <Header />

      <div className="mt-5 ...">
        <div className="w-auto grid justify-items-center ...">
          <FavoriteWrestlersList appState={appState} dispatch={dispatch} />
          <SearchButton appState={appState} dispatch={dispatch} />
        </div>
        <AlbumCollectionSection appState={appState} />
      </div>
    </>
  );
};
