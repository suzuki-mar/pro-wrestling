import { Ctx } from 'blitz';
import { TSource } from 'app/wrespic';
import { JSONConvert } from '../jsonConvert';

export default async function getPictureUrls(
  selectedWrestlersParams: any,
  { session }: Ctx
): Promise<TSource[]> {
  const selectedWrestlers = JSONConvert.toSelectedWresler(selectedWrestlersParams);
  await selectedWrestlers.searchFromTwitter();

  return selectedWrestlers.pictureUrls();
}
