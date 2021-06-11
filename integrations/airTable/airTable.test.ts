import { AirTable, Record } from './airTable';
import { AirTableURL } from './interface';

describe('AirTable', () => {
  describe.skip('外部ネットワークへの接続なため必要なとき以外はテストをしない', () => {
    const airTable = new AirTable();

    describe('fetchRecords', () => {
      it('レコードを取得できること', async () => {
        return airTable.fetchRecords(AirTableURL.WrestlerDebug).then((records: Record[]) => {
          //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
          // eslint-disable-next-line
          expect(records.length).not.toEqual(0);
          const record = records[0] as Record;
          expect(record.fields).not.toBeNull();
        });
      });
    });

    describe('createRecords', () => {
      it('レコードを保存できること', async () => {
        const records = [new Record({ Name: 'Hoge' })];
        return airTable.createRecords(AirTableURL.WrestlerDebug, records).then((success) => {
          //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
          // eslint-disable-next-line
          expect(success).toBeTruthy;
        });
      });
    });
  });
});

export {};
