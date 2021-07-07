import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { IWrestlerName } from 'app/core/wreslter';
import { IFavoriteWrestlers } from 'app/wrespic';
import { JSONConvert } from 'app/wrespic/states/jsonConvert';
import { useState, useContext } from 'react';
import { ListItemText, ListItem, Checkbox } from '@material-ui/core';
import { findValuesFromContext, WrespicContext } from '../Context';

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

  const name: IWrestlerName = JSONConvert.toWreslerName(data[index]!);

  return <WrestlerNameItem name={name} style={style} />;
}

type ItemProps = {
  name: IWrestlerName;
  style: any;
};

const WrestlerNameItem: React.VFC<ItemProps> = ({ name, style }) => {
  const contextValues = findValuesFromContext(useContext(WrespicContext));

  const [isClicked, setIsClicked] = useState(false);

  const onChange = () => {
    contextValues.setSelectedWrestlersList(contextValues.selectedWrestlers.selectWreslerName(name));

    setIsClicked(!isClicked);
  };

  return (
    <ListItem data-testid="custom-element" style={style} key={name.full}>
      <ListItemText id={name.full} primary={name.full} />
      <Checkbox edge="end" onChange={onChange} checked={isClicked} />
    </ListItem>
  );
};
