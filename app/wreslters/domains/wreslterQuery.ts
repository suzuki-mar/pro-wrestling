import prisma from 'db/index';
import { TWrestlerName } from '..';
import { WrestlerName } from './models/wrestlerName';
import { IWrestlerQuery } from './type';

export class WreslerQuery implements IWrestlerQuery {
  async findNames(): Promise<TWrestlerName[]> {
    const records = await prisma.wrestlerName.findMany({});
    return records.map((record) => new WrestlerName(record.name, record.unique));
  }
}
