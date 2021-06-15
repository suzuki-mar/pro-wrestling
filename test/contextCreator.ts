import prisma from 'db/index';

export class ContextCreator {
  static async createContextInWrestlerExists(): Promise<void> {
    await prisma.$reset();
    await prisma.wrestler.create({
      data: { name: '桃野美桜' },
    });
  }
}
