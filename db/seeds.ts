import { SampleData } from 'sampleData';
import prisma from 'db/index';
import { Wrestler } from 'app/wreslters/domains/models/wrestler';

const seed = async () => {
  // ユニーク制約にひかっからないようにすむためにデータを消す
  await prisma.$reset();

  await Wrestler.creates(SampleData.wrestlerNames());
};

export default seed;
