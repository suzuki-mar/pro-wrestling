import { Ctx } from 'blitz';
import { TSource } from 'app/wrespic';
import { SampleData } from 'sampleData';

export default async function fetchSources(
  selectedWrestlersParams: any,
  { session }: Ctx
): Promise<TSource[]> {
  // 一旦モックで実装
  // const selectedWrestlers = ValueObjectConvert.toSelectedWresler(selectedWrestlersParams);
  // await selectedWrestlers.searchFromTwitter();
  return SampleData.sources();
}
