import { format } from 'pretty-format';

export class Infra {
  static log(value: any) {
    console.log(format(value));
  }

  static isTestEnv() {
    return process?.env?.NODE_ENV === 'test';
  }
}
