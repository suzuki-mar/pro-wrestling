import { Ctx } from 'blitz';
import { TSource } from 'app/wrespic';
import { IWrestler, TWrestlerName, WrestlerParam } from 'app/core/wreslter';
import { Wrestler } from 'app/core/wreslter/wrestler';
import { SourceCollection } from 'app/wrespic/models/sourceCollection/sourceCollection';
import { ValueObjectConvert } from '../valueObjectConvert';

export default async function fetchSources(
  // JSONとして渡ってくるため型定義をするのが難しい
  paramsList: any,
  { session }: Ctx
): Promise<TSource[]> {
  const wrestlerParamsList: WrestlerParam[] = paramsList.map((params) => {
    const name = ValueObjectConvert.toWreslerName(params['name']);
    return { name: name, id: params['id'] };
  });

  const wrestlers: IWrestler[] = wrestlerParamsList.map((params) => Wrestler.build(params));
  const names: TWrestlerName[] = wrestlers.map((w) => w.name);
  const sourceCollection = new SourceCollection();
  await sourceCollection.load(names);

  return sourceCollection.sources();
}
