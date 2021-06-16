// import db from "./index"

import { TestData } from 'test/testData';
import { Wrestler } from 'app/core/wreslter/wrestler';
import prisma from 'db/index';

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  // ユニーク制約にひかっからないようにすむためにデータを消す
  await prisma.$reset();

  await createWrestlers();
};

// テストできるようにするためにexportしている
export async function createWrestlers(): Promise<void> {
  const names = TestData.marvelousWrestlerNames();
  await Wrestler.creates(names);
}

export default seed;
