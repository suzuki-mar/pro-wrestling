import { TWrestlerName, IWrestler } from 'app/wreslters';
import { IWrestlerRepository } from 'app/wreslters/domains/type';
import { Wrestler as DWrestler } from 'app/wreslters/domains/models/wrestler';
import { WrestlerName as DWrestlerName } from 'app/wreslters/domains/models/wrestlerName';
import prisma from 'db/index';

export class WrestlerRepository implements IWrestlerRepository {
  async fetchAll(): Promise<IWrestler[]> {
    const records = await prisma.wrestler.findMany({
      include: {
        names: true,
      },
    });

    return records.map((record) => {
      // ドメイン上はNameは一つだけしか対応していない
      const nameRecord = record.names[0]!;
      const name = new DWrestlerName(nameRecord.name, nameRecord.unique);
      return new DWrestler(record.id, name);
    });
  }

  async add(aName: TWrestlerName): Promise<IWrestler> {
    const nameParams = { create: [{ name: aName.full, unique: aName.unique }] };
    const record = await prisma.wrestler.create({ data: { names: nameParams } });

    return new DWrestler(record.id, aName);
  }

  async fetchByName(aName: TWrestlerName): Promise<IWrestler> {
    const record = await prisma.wrestlerName.findUnique({
      where: {
        name: aName.full,
      },
      include: {
        wrestler: true,
      },
    });

    const name = new DWrestlerName(record!.name, record!.unique);
    return new DWrestler(record!.wrestler.id, name);
  }
}
