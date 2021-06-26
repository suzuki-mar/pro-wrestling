import { useState, useContext } from 'react';
import { ListItemText, ListItem, Checkbox } from '@material-ui/core';
import { IWrestlerName } from 'app/core/wreslter';
import { findValuesFromContext, WrespicContext } from '../Context';
import { SampleData } from 'sampleData';

type Props = {
  name: IWrestlerName;
  style: any;
};

export const WrestlerNameItem: React.VFC<Props> = ({ name, style }) => {
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
