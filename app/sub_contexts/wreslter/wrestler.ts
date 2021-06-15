import { IWrestler } from 'app/sub_contexts/wreslter/interface';

export class Wrestler implements IWrestler {
  constructor(private _name: string) {}

  name(): string {
    return this._name;
  }
}
