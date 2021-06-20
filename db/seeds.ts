// import db from "./index"

import { SampleData } from 'sampleData';
import prisma from 'db/index';
import { WrestlerRepository } from 'db/repositrories/wrestlerRepository';

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
  const names = SampleData.wrestlerNames();
  const repository = new WrestlerRepository();
  await repository.addList(names);
}

export default seed;
