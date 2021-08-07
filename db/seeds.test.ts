import seed from './seeds';
import prisma from 'db/index';
import { dbClose } from 'test/lib';

describe('最後まで実行できるかの確認', () => {
  beforeEach(async () => {
    await prisma.$reset();
  });

  it('エラーにならないこと', async (done) => {
    await seed();
    await dbClose(done);
  });
});

export {};
