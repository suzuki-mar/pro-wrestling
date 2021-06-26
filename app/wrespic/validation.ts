import { IFavoriteWrestlers } from 'app/wrespic';
import { IWrestler, IWrestlerName } from 'app/core/wreslter';
import { Wrestler } from 'app/core/wreslter/wrestler';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { z } from 'zod';
import _ from 'lodash';

export const WreslerNames = z.array(
  z.object({
    full: z.string(),
  })
);

export function isExistsWreslerNames(
  names: IWrestlerName[],
  favoriteWrestlers: IFavoriteWrestlers
) {
  const exsitsWrestlers: (IWrestler | undefined)[] = _.map(names, (name: WrestlerName) => {
    const matchs = _.filter(favoriteWrestlers.wrestlers(), (wrestler: Wrestler) => {
      return name.equal(wrestler.name);
    });

    return matchs[0];
  });

  let result = true;
  _.each(exsitsWrestlers, (wrestler) => {
    if (typeof wrestler !== 'object') {
      result = false;
    }
  });

  return result;
}
