import { FavoriteWrestlersList } from 'app/wrespic/components/wrestler/FavoriteWreslersList';
import { SearchButton } from 'app/wrespic/components/wrestler/SearchButton';
import { IFavoriteWrestlers } from 'app/wrespic';

type Props = {
  favoriteWrestlers: IFavoriteWrestlers;
};

export const WrestlerSelection: React.VFC<Props> = ({ favoriteWrestlers }) => {
  return (
    <div className="w-auto grid justify-items-center ...">
      <FavoriteWrestlersList favoriteWrestlers={favoriteWrestlers} />
      <SearchButton />
    </div>
  );
};
