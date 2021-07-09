import { Head, BlitzPage } from 'blitz';
import CatalogLayout from 'app/core/layouts/CatalogLayout';
import { CatalogList, ComponentType } from 'app/core/components/CatalogList';
import { IFavoriteWrestlers, ISelectedWrestlers } from 'app/wrespic';
import { AlbumCollectionSection } from 'app/wrespic/components/AlbumCollectionSection';
import { SampleData } from 'sampleData';
import { useBuildDomainModels } from 'app/wrespic/states/hooks/useBuildDomainModels';

function createCatalogListProps(
  selectedWrestlers: ISelectedWrestlers,
  favoriteWrestlers: IFavoriteWrestlers
) {
  return [
    {
      title: 'PictureList',
      description: '写真リスト',
      content: <AlbumCollectionSection albumCollection={SampleData.albumCollection()} />,
      type: ComponentType.Molecules,
    },
  ];
}

const WrespicsPage: BlitzPage = () => {
  const [favoriteWrestlers, selectedWrestlers] = useBuildDomainModels();

  const catalogListProps = createCatalogListProps(selectedWrestlers, favoriteWrestlers);

  return (
    <>
      <Head>
        <title>Wrespics</title>
      </Head>

      <CatalogList catalogListProps={catalogListProps} />
    </>
  );
};

WrespicsPage.authenticate = false;
WrespicsPage.getLayout = (page) => <CatalogLayout>{page}</CatalogLayout>;

export default WrespicsPage;
