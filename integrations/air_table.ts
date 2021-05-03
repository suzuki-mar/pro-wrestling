import axios from 'axios';
import * as _ from 'lodash';
import dotenv from 'dotenv';
import { AirTable as AirTableIF, Record as RecordIF, AirTableURL } from './interface';

dotenv.config();

export class Record implements RecordIF {
  fields: { [name: string]: string };

  constructor(fields: { [name: string]: string }) {
    this.fields = fields;
  }
}

export class AirTable implements AirTableIF {
  async fetchRecords(apiURL: AirTableURL): Promise<Record[] | null> {
    const response = await axios.get(apiURL, this.buildHeaders());

    return Promise.resolve(response)
      .then((res) => {
        const records: Record[] = _.flatMap(res['data']['records'], function (record: any[]) {
          return new Record(record['fields']);
        });

        return records;
      })
      .catch(() => {
        return null;
      });
  }

  async createRecords(apiURL: AirTableURL, records: Record[]): Promise<Boolean> {
    const filedsParams = _.flatMap(records, function (record) {
      const params: { [name: string]: any } = {};
      params['fields'] = record['fields'];
      return params;
    });

    const params = { records: filedsParams };
    return await this.post(apiURL, params);
  }

  private buildHeaders(): any {
    return {
      headers: {
        Authorization: `Bearer ` + process.env.AIRTABLE_KEY,
      },
    };
  }

  private async post(apiURL: AirTableURL, params: any) {
    return axios
      .post(apiURL, params, this.buildHeaders())
      .then(function (response) {
        return true;
      })
      .catch(function (response) {
        return false;
      });
  }
}
