import faker from 'faker';
import prisma from 'db/index';

export const sleep = (someFunction) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(someFunction());
    }, faker.datatype.number(100));
  });
};

export const dbClose = async (done: jest.DoneCallback) => {
  await prisma.$disconnect();
  done();
};
