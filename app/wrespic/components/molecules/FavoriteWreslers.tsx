import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { TWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from '../atoms/WreslerName';
import { IFavoriteWrestlers } from 'app/wrespic';

type Props = {
  favoriteWrestlers: IFavoriteWrestlers;
};

export const FavoriteWrestlers: React.VFC<Props> = ({ favoriteWrestlers }) => {
  if (favoriteWrestlers.wrestlers() === undefined) {
    return <div data-testid="custom-element"></div>;
  }

  const names = favoriteWrestlers.wrestlers().map((wrestler) => {
    return wrestler.name;
  });

  const itemHeight = 30;

  const itemStyle = {
    width: '100%',
    height: itemHeight,
  };

  const listHeight = (favoriteWrestlers.wrestlers().length + 1) * itemStyle['height'] + 10;

  return (
    <div data-testid="custom-element">
      <FixedSizeList
        height={listHeight}
        width={200}
        itemData={names}
        itemCount={names.length}
        itemSize={30}
      >
        {renderRow}
      </FixedSizeList>
    </div>
  );
};

function renderRow(props: ListChildComponentProps) {
  const { style, data, index } = props;

  const name: TWrestlerName = data[index]! as TWrestlerName;

  return <WrestlerName name={name} style={style} />;
}
