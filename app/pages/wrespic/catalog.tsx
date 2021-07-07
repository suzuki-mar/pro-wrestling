import { Head, BlitzPage } from 'blitz';
import CatalogLayout from 'app/core/layouts/CatalogLayout';
import { CatalogList, ComponentType } from 'app/core/components/CatalogList';
import { FavoriteWrestlersList } from 'app/wrespic/components/wrestler/FavoriteWreslersList';
import { SearchButton } from 'app/wrespic/components/wrestler/SearchButton';
import { useSelectedWrestlers, useLoadFavoriteWrestlers } from 'app/wrespic/states/hooks';
import { IFavoriteWrestlers, ISelectedWrestlers } from 'app/wrespic';
import { AlbumGroup } from 'app/wrespic/components/AlbumGroup';
import { WrestlerSelection } from 'app/wrespic/components/wrestler/WrestlerSelection';

function createCatalogListProps(
  selectedWrestlers: ISelectedWrestlers,
  favoriteWrestlers: IFavoriteWrestlers
) {
  return [
    {
      title: 'PictureList',
      description: '写真リスト',
      content: <AlbumGroup />,
      type: ComponentType.Molecules,
    },

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
  ];
}

const WrespicsPage: BlitzPage = () => {
  const favoriteWrestlers = useLoadFavoriteWrestlers();
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
