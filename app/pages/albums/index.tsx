import { Head, BlitzPage } from 'blitz';
import Layout from 'app/core/layouts/Layout';
import { useFactoryDomainModels } from 'app/albums/hooks/useFactoryDomainModels';
import { Header } from 'app/albums/components/Header';
import { AlbumCollectionSection } from 'app/albums/components/AlbumCollectionSection';
import { WrestlersList } from 'app/wreslters/components/WrestlersList';
import { SearchButton } from 'app/albums/components/SearchButton';
import { useAppReducer } from 'app/albums/hooks/useAppReducer';

const WrespicsPage: BlitzPage = () => {
  const [wrestlerCollection, selectedWrestlers, albumCollection] = useFactoryDomainModels();
  const [appState, dispatch] = useAppReducer(
    selectedWrestlers,
    albumCollection,
    wrestlerCollection
  );

  return (
    <div className="backgroundColor">
      <Head>
        <title>Wrespic</title>
      </Head>

      <Header />

      <div className="mt-5 ...">
        <div className="w-auto grid justify-items-center ...">
          <WrestlersList appState={appState} dispatch={dispatch} />
          <SearchButton appState={appState} dispatch={dispatch} />
        </div>
        <AlbumCollectionSection appState={appState} />
      </div>
    </div>
  );
};

WrespicsPage.authenticate = false;
WrespicsPage.getLayout = (page) => <Layout>{page}</Layout>;

export default WrespicsPage;
