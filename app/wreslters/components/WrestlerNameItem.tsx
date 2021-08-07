import { TWrestlerName } from 'app/wreslters';
import { useState, Dispatch } from 'react';
import { ListItemText, ListItem, Checkbox } from '@material-ui/core';
import { WrestlersAppState } from 'app/wreslters';
import { UIAction } from '../../albums';

type Props = {
  name: TWrestlerName;
  style: any;
  appState: WrestlersAppState;
  dispatch: Dispatch<UIAction>;
};

export const WrestlerNameItem: React.VFC<Props> = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const onChange = () => {
    props.dispatch({ type: 'selecteWrestler', payload: { name: props.name } });
    setIsClicked(!isClicked);
  };

  const isSelected = props.appState.selectedWrestlers.isSelected(props.name);

  return (
    <ListItem data-testid="custom-element" style={props.style} key={props.name.full}>
      <ListItemText id={props.name.full} primary={props.name.full} />
      <Checkbox edge="end" onChange={onChange} checked={isSelected} />
    </ListItem>
  );
};
