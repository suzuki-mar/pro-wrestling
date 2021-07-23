import { useFactoryDomainModels } from 'app/wrespic/hooks/useFactoryDomainModels';
import { Header } from 'app/wrespic/components/Header';
import { AlbumCollectionSection } from 'app/wrespic/components/album/AlbumCollectionSection';
import { WrestlersList } from 'app/wrespic/components/wrestler/WrestlersList';
import { SearchButton } from 'app/wrespic/components/SearchButton';
import { useAppReducer } from '../hooks/useAppReducer';

export const Contents: React.VFC = () => {
  const [wrestlerCollection, selectedWrestlers, albumCollection] = useFactoryDomainModels();
  const [appState, dispatch] = useAppReducer(
    selectedWrestlers,
    albumCollection,
    wrestlerCollection
  );

  return (
    <>
      <Header />

      <div className="mt-5 ...">
        <div className="w-auto grid justify-items-center ...">
          <WrestlersList appState={appState} dispatch={dispatch} />
          <SearchButton appState={appState} dispatch={dispatch} />
        </div>
        <AlbumCollectionSection appState={appState} />
      </div>
    </>
  );
};
