import { TWrestlerName } from 'app/core/wreslter';
import { useState, Dispatch } from 'react';
import { ListItemText, ListItem, Checkbox } from '@material-ui/core';
import { AppState, Action } from '../../hooks/useAppStatusReducer';

type Props = {
  name: TWrestlerName;
  style: any;
  appState: AppState;
  dispatch: Dispatch<Action>;
};

export const WrestlerNameItem: React.VFC<Props> = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const onChange = () => {
    props.dispatch({ type: 'selecteWrestler', payload: { name: props.name } });
    setIsClicked(!isClicked);
  };

  return (
    <ListItem data-testid="custom-element" style={props.style} key={props.name.full}>
      <ListItemText id={props.name.full} primary={props.name.full} />
      <Checkbox edge="end" onChange={onChange} checked={isClicked} />
    </ListItem>
  );
};
