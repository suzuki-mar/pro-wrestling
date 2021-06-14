import faker from 'faker';
import { ClientFactory } from 'db/repositrories/clientFactory';

export const sleep = (someFunction) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(someFunction());
    }, faker.datatype.number(100));
  });
};

export const dbClose = async (done: jest.DoneCallback) => {
  await ClientFactory.factoryPrismaClient().$disconnect();
  done();
};
