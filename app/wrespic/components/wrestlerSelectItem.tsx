import { FormControlLabel, Checkbox } from '@material-ui/core';

export default function WreslterSelectItem({ wrestler }) {
  return (
    <FormControlLabel control={<Checkbox name={wrestler.name.full} />} label={wrestler.name.full} />
  );
}
