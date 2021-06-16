import * as _ from 'lodash';
import { IWrestler } from 'app/core/wreslter/interface';
import { IWrestlerRepository } from 'app/core/wreslter/interface';
import { Wrestler as EWrestler } from 'app/core/wreslter/wrestler';
import { Wrestler } from 'db/index';
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

  async addList(names: string[]): Promise<IWrestler[]> {
    const wrestlers = _.map(names, (name: string) => {
      return prisma.wrestler.create({ data: { name: name } });
    });

    return Promise.all(wrestlers).then((values: Wrestler[]) => {
      return _.map(values, (wrestler: Wrestler) => {
        return new EWrestler(wrestler.name);
      });
    });
  }
}
