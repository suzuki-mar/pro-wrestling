export interface Record {
  readonly fields: { [name: string]: string };
}

export enum AirTableURL {
  WrestlerDebug = 'https://api.airtable.com/v0/apprpgNSLv2x60Hr2/ProWrestlerDebug',
}

export interface AirTable {
  fetchRecords(apiURL: AirTableURL): Promise<Record[] | null>;
  createRecords(apiURL: AirTableURL, records: Record[]): Promise<Boolean>;
}
