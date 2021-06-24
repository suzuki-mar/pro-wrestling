import { FavoriteWrestlers } from 'app/wrespic/components/molecules/FavoriteWreslers';
import { SearchButton } from 'app/wrespic/components/atoms/SearchButton';
import { IFavoriteWrestlers, ISelectedWrestlers } from 'app/wrespic';

type Props = {
  favoriteWrestlers: IFavoriteWrestlers;
  selectedWrestlers: ISelectedWrestlers;
};

export const WrestlerSelection: React.VFC<Props> = ({ favoriteWrestlers, selectedWrestlers }) => {
  return (
    <div className="w-auto grid justify-items-center ...">
      <FavoriteWrestlers favoriteWrestlers={favoriteWrestlers} />
      <SearchButton selectedWrestlers={selectedWrestlers} />
    </div>
  );
};
