import * as _ from 'lodash';
import { WrestlerRepository } from './interface';
import { AirTable, AirTableURL } from '../../integrations/interface';
import { Record } from '../../integrations/air_table';
import { Wrestler } from './wrestler';

export class Repository implements WrestlerRepository {
  private airTable: AirTable;

  constructor(airTable: AirTable) {
    this.airTable = airTable;
  }

  async fetchWrestlers(): Promise<Wrestler[] | null> {
    const records = await this.airTable.fetchRecords(AirTableURL.WrestlerDebug);

    return Promise.resolve(records)
      .then((records) => {
        const wrestlers: Wrestler[] = _.flatMap(records, function (record: Record): any {
          return new Wrestler(record.fields['Name']);
        });

        return wrestlers;
      })
      .catch((res) => {
        return null;
      });
  }

  async saveWreslers(wreslers: Wrestler[]): Promise<Boolean> {
    const records = _.flatMap(wreslers, function (wresler) {
      return new Record({ Name: wresler.name });
    });

    return await this.airTable.createRecords(AirTableURL.WrestlerDebug, records);
  }
}
