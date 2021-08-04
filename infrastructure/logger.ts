import { format } from 'pretty-format';

export class Logger {
  static log(value: any) {
    console.log(format(value));
  }

  static line(value: any) {
    console.log(value + '---------------------------------------');
  }
}
