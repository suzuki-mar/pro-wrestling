import { Head, BlitzPage } from 'blitz';
import CatalogLayout from 'app/core/layouts/CatalogLayout';
import { CatalogList, ComponentType } from 'app/core/components/CatalogList';
import { FavoriteWrestlersList } from 'app/wrespic/components/molecules/FavoriteWreslersList';
import { WrestlerNameItem } from 'app/wrespic/components/atoms/WreslerNameItem';
import { SearchButton } from 'app/wrespic/components/atoms/SearchButton';
import { WrestlerSelection } from 'app/wrespic/components/organisms/WrestlerSelection';
import { SampleData } from 'sampleData';
import { useSelectedWrestlers, useFavoriteWrestlers } from 'app/wrespic/hooks';
import { FavoriteWrestlers as EFavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';

import { IFavoriteWrestlers, ISelectedWrestlers } from 'app/wrespic';

function createCatalogListProps(
  selectedWrestlers: ISelectedWrestlers,
  favoriteWrestlers: IFavoriteWrestlers
) {
  return [
    {
      title: 'WrestlerSelection',
      description: 'レスラー検索コンポーネント',
      content: <WrestlerSelection favoriteWrestlers={favoriteWrestlers} />,
      type: ComponentType.Templates,
    },

    {
      title: 'SearchButton',
      description: 'レスラーの画像検索ボタン',
      content: <SearchButton />,
      type: ComponentType.Atom,
    },
    {
      title: 'FavoriteWrestlers',
      description: '好きなレスラー一覧',
      content: <FavoriteWrestlersList favoriteWrestlers={favoriteWrestlers} />,
      type: ComponentType.Molecules,
    },
    {
      title: 'WreslerName',
      description: 'レスラーの名前',
      content: (
        <WrestlerNameItem name={SampleData.wrestlerName()} style={{ width: '100%', height: 30 }} />
      ),
      type: ComponentType.Atom,
    },
  ];
}

const WrespicsPage: BlitzPage = () => {
  const favoriteWrestlers = useFavoriteWrestlers();
  const catalogListProps = createCatalogListProps(useSelectedWrestlers(), favoriteWrestlers);

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
