import faker from 'faker';
import prisma from 'db/index';
import { Logger } from 'infrastructure/logger';

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

export class NotImplementedError extends Error {
  constructor() {
    super();
    this.name = 'NotImplementedError';
  }
}

export function exit() {
  throw new Error('Something bad happened');
}

export function exitAndLog(value) {
  Logger.log(value);

  exit();
}
