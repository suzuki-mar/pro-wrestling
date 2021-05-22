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

export interface ITwitterParams {
  toHash(): { [key: string]: string };
  addHashTag(tag: string, operator: TwitterQueryOperator): ITwitterParams;
  initializeHashtaGroup(tag: string): ITwitterParams;
  addFilter(filter: TwitterFiliter): ITwitterParams;
}

export interface ITwitter {
  search(query: ITwitterParams): Promise<ITweet[]>;
}

export interface ITweet {
  id(): Number;
  text(): string;
  photo_url(): URL;
}
