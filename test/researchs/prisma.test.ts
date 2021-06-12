import prisma from '../../db/index';
import { Wrestler } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

class WrestlerRepository {
  constructor(private prisma: PrismaClient) {}

  fetchByName(name: string): Promise<Array<Wrestler>> {
    return prisma.wrestler.findMany({
      where: {
        name: name,
      },
    });
  }
}

describe('Prismaのテスト', () => {
  describe.skip('学習テストのため必要になるまではSkip', () => {
    const name1 = '桃野美桜';
    const name2 = '星月芽依';

    beforeEach(async () => {
      await prisma.$reset();
    });

    describe('レコードの作成', () => {
      it('作成できていること', async () => {
        return prisma.wrestler
          .create({
            data: { name: name1 },
          })
          .catch((e) => {
            throw e;
          })
          .finally(async () => {
            //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
            // eslint-disable-next-line
            const reccords = await prisma.wrestler.findMany();
            expect(reccords.length).toBeGreaterThanOrEqual(1);
          });
      });
    });

    describe('レコードの取得', () => {
      beforeEach(async () => {
        await prisma.wrestler.create({
          data: { name: name1 },
        });

        await prisma.wrestler.create({
          data: { name: name2 },
        });
      });

      it('全件取得できていること', async () => {
        return prisma.wrestler
          .findMany()
          .then((wrestlers) => {
            //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
            // eslint-disable-next-line

            expect(wrestlers.length).toEqual(2);
          })
          .catch((e) => {
            throw e;
          });
      });

      it('指定したNameを取得できていること', async () => {
        const repository = new WrestlerRepository(prisma);
        return repository
          .fetchByName(name1)
          .then((wrestlers) => {
            //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
            // eslint-disable-next-line

            expect(wrestlers.length).toEqual(1);
          })
          .catch((e) => {
            throw e;
          });
      });
    });

    describe('レコードのアップデート', () => {
      beforeEach(async () => {
        await prisma.wrestler.create({
          data: { name: name1 },
        });
      });

      it('アップデートできていること', async () => {
        await prisma.wrestler.update({
          where: {
            name: name1,
          },
          data: {
            name: name2,
          },
        });

        return prisma.wrestler
          .findMany()
          .then((wrestlers) => {
            expect(wrestlers.length).not.toEqual(0);
            const wrestler = wrestlers[0] as Wrestler;
            expect(wrestler.name).toEqual(name2);
          })
          .catch((e) => {
            throw e;
          });
      });
    });

    describe('レコードの削除', () => {
      beforeEach(async () => {
        await prisma.wrestler.create({
          data: { name: name1 },
        });

        await prisma.wrestler.create({
          data: { name: name2 },
        });
      });

      it('全件削除できていること', async () => {
        // FIX 削除のテストになっていない
        return prisma.wrestler
          .findMany()
          .then((wrestlers) => {
            expect(wrestlers.length).not.toEqual(0);
            const wrestler = wrestlers[0] as Wrestler;

            expect(wrestler.name).toEqual(name2);
          })
          .catch((e) => {
            throw e;
          });
      });
    });
    describe('モックの使用', () => {
      it('モックを使用してSQLを実行できること', async () => {});
    });
  });
});

export {};
