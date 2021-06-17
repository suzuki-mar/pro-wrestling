import * as _ from 'lodash';
import { IWrestler, WrestlerName } from 'app/core/wreslter/interface';
import { IWrestlerRepository } from 'app/core/wreslter/interface';
import { Wrestler as EWrestler } from 'app/core/wreslter/wrestler';
import { Wrestler } from 'db/index';
import prisma from 'db/index';

export class WrestlerRepository implements IWrestlerRepository {
  async fetchAll(): Promise<IWrestler[]> {
    const records = prisma.wrestler.findMany();
    return records.then((records) => {
      return _.map(records, (r) => {
        const name: WrestlerName = { full: r.name };
        return new EWrestler(name);
      });
    });
  }

  async addList(names: WrestlerName[]): Promise<IWrestler[]> {
    const records = _.map(names, (name: WrestlerName) => {
      return prisma.wrestler.create({ data: { name: name.full } });
    });

    return Promise.all(records).then((records: Wrestler[]) => {
      return _.map(records, (r: Wrestler) => {
        const name: WrestlerName = { full: r.name };
        return new EWrestler(name);
      });
    });
  }
}
