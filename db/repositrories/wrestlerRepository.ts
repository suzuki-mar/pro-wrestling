import * as _ from 'lodash';
import { IWrestler, TWrestlerName } from 'app/core/wreslter';
import { IWrestlerRepository } from 'app/core/wreslter';
import { Wrestler as EWrestler } from 'app/core/wreslter/wrestler';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { Wrestler } from 'db/index';
import prisma from 'db/index';

export class WrestlerRepository implements IWrestlerRepository {
  async fetchAll(): Promise<IWrestler[]> {
    const records = prisma.wrestler.findMany();
    return records.then((records) => {
      return _.map(records, (r) => {
        return this.buildEWrestler(r);
      });
    });
  }

  async addList(names: TWrestlerName[]): Promise<IWrestler[]> {
    const records = _.map(names, (name: TWrestlerName) => {
      return prisma.wrestler.create({ data: { name: name.full } });
    });

    return Promise.all(records).then((records: Wrestler[]) => {
      return _.map(records, (r: Wrestler) => {
        return this.buildEWrestler(r);
      });
    });
  }

  private buildEWrestler(record: Wrestler): EWrestler {
    const name: WrestlerName = new WrestlerName(record.name);
    return new EWrestler(name);
  }
}
