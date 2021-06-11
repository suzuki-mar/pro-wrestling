import { IWrestler } from '../sub_contexts/wreslter/interface';
import { Source } from './source';
import { IContent } from './interface';

export class Content implements IContent {
  readonly source: Source;
  readonly performingWrestlers: IWrestler[];
}
