// TODO RecordをAirTabelRecordに変更する
export interface IRecord {
  readonly fields: { [name: string]: string };
}

export enum AirTableURL {
  WrestlerDebug = 'https://api.airtable.com/v0/apprpgNSLv2x60Hr2/ProWrestlerDebug',
}

export interface IAirTable {
  fetchRecords(apiURL: AirTableURL): Promise<IRecord[] | null>;
  createRecords(apiURL: AirTableURL, records: IRecord[]): Promise<Boolean>;
}
