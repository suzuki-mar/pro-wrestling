export class Logger {
  static log(value: string | Array<any> | Object) {
    if ('string' == typeof value) {
      console.log(value);
      return;
    }

    if (Array.isArray(value)) {
      console.table(value);
      return;
    }

    console.dir(value);
  }
}

export class NotImplementedError extends Error {
  constructor() {
    super();
    this.name = 'NotImplementedError';
  }
}
