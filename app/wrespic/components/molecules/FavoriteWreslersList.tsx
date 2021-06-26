import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { IWrestlerName } from 'app/core/wreslter';
import { WrestlerNameItem } from '../atoms/WreslerNameItem';
import { IFavoriteWrestlers } from 'app/wrespic';
import { VModelCreator } from 'app/wrespic/view_models/modelCreator';

type Props = {
  favoriteWrestlers: IFavoriteWrestlers;
};

export const FavoriteWrestlersList: React.VFC<Props> = ({ favoriteWrestlers }) => {
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
  const name: IWrestlerName = VModelCreator.buildWreslerName(data[index]!);
  return <WrestlerNameItem name={name} style={style} />;
}
