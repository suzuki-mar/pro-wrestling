import * as _ from 'lodash';
import { IWrestler } from 'app/sub_contexts/wreslter/interface';
import { IWrestlerRepository } from 'app/sub_contexts/wreslter/interface';
import { Wrestler as EWrestler } from 'app/sub_contexts/wreslter/wrestler';
import prisma from 'db/index';

export class WrestlerRepository implements IWrestlerRepository {
  async fetchAll(): Promise<IWrestler[]> {
    const records = prisma.wrestler.findMany();
    return records.then((records) => {
      return _.map(records, (r) => {
        return new EWrestler(r.name);
      });
    });
  }
}
