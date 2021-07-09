import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { IWrestlerName } from 'app/core/wreslter';
import { IFavoriteWrestlers, ISelectedWrestlers } from 'app/wrespic';
import { JSONConvert } from 'app/wrespic/states/jsonConvert';
import { useState, useContext } from 'react';
import { ListItemText, ListItem, Checkbox } from '@material-ui/core';
import { findContextValue, WrespicContext } from './Context';

type Props = {
  favoriteWrestlers: IFavoriteWrestlers;
  selectedWrestlers: ISelectedWrestlers;
};

export const FavoriteWrestlersList: React.VFC<Props> = ({
  favoriteWrestlers,
  selectedWrestlers,
}) => {
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
        itemData={{ names: names, selectedWrestlers: selectedWrestlers }}
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
  const names = data['names'];
  const selectedWrestlers = data['selectedWrestlers'];
  const name: IWrestlerName = JSONConvert.toWreslerName(names[index]!);

  return <WrestlerNameItem name={name} style={style} selectedWrestlers={selectedWrestlers} />;
}

type ItemProps = {
  name: IWrestlerName;
  style: any;
  selectedWrestlers: ISelectedWrestlers;
};

const WrestlerNameItem: React.VFC<ItemProps> = ({ name, style, selectedWrestlers }) => {
  const contextValue = findContextValue(useContext(WrespicContext));
  const [isClicked, setIsClicked] = useState(false);

  const onChange = () => {
    contextValue.wrestler.setSelectedWrestlerNames(selectedWrestlers.selectWreslerName(name));

    setIsClicked(!isClicked);
  };

  return (
    <ListItem data-testid="custom-element" style={style} key={name.full}>
      <ListItemText id={name.full} primary={name.full} />
      <Checkbox edge="end" onChange={onChange} checked={isClicked} />
    </ListItem>
  );
};
