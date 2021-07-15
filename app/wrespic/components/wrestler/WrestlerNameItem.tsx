import { TWrestlerName } from 'app/core/wreslter';
import { useState, Dispatch } from 'react';
import { ListItemText, ListItem, Checkbox } from '@material-ui/core';
import { AppState, Action } from '../../hooks/useAppStatusReducer';
import { useConvertWrestlerName } from '../../hooks/useConvertWrestlerName';

type Props = {
  nameJson: {};
  style: any;
  appState: AppState;
  dispatch: Dispatch<Action>;
};

export const WrestlerNameItem: React.VFC<Props> = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const name: TWrestlerName = useConvertWrestlerName(props.nameJson);

  const onChange = () => {
    props.dispatch({ type: 'selecteWrestler', payload: { name: name } });
    setIsClicked(!isClicked);
  };

  return (
    <ListItem data-testid="custom-element" style={props.style} key={name.full}>
      <ListItemText id={name.full} primary={name.full} />
      <Checkbox edge="end" onChange={onChange} checked={isClicked} />
    </ListItem>
  );
};
