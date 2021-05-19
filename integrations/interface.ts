// TODO RecordをAirTabelRecordに変更する
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

export enum TwitterQueryOperator {
  AND = 'AND',
  OR = 'OR',
}

export enum TwitterFiliter {
  IMAGES = 'images',
  // ツイッターの画像が含まれるツイート
  TWIMG = 'twimg',
  VIDEOS = 'videos',
  MEDIA = 'media',
  UNFILTERED = 'unfiltered',
}

export interface TwitterParams {
  toHash(): { [key: string]: string };
  addHashTag(tag: string, operator: TwitterQueryOperator): TwitterParams;
  initializeHashtaGroup(tag: string): TwitterParams;
  addFilter(filter: TwitterFiliter): TwitterParams;
}

export interface Twitter {
  search(query: TwitterParams): Promise<Tweet[]>;
}

export interface Tweet {
  id(): Number;
  text(): string;
  photo_url(): URL;
}
