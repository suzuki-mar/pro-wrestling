import { ListItemText, ListItem, Checkbox } from '@material-ui/core';
import { TWrestlerName } from 'app/core/wreslter';
import faker from 'faker';

type Props = {
  name: TWrestlerName;
  style: any;
};

export const WrestlerName: React.VFC<Props> = ({ name, style }) => {
  return (
    <ListItem data-testid="custom-element" style={style} key={name.full}>
      <ListItemText id={name.full} primary={name.full} />
      <Checkbox
        edge="end"
        // onChange={handleToggle(value)}
        checked={faker.datatype.boolean()}
        // inputProps={{ 'aria-labelledby': labelId }}
      />
    </ListItem>
  );
};
