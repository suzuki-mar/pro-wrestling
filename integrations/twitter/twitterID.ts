import { TTwitterID } from '.';

export class TwitterID implements TTwitterID {
  static build(value: string): TTwitterID {
    const numeric = BigInt(value);
    return new TwitterID(numeric, numeric.toString());
  }

  equal(compare: TTwitterID): boolean {
    return this.value === compare.value;
  }

  private constructor(readonly numeric: BigInt, readonly value: string) {}
}
