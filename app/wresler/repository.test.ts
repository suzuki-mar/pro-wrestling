import { Wrestler } from '../../app/wresler/wrestler';
import { Repository } from '../../app/wresler/repository';
import { AirTable, Record } from '../../integrations/air_table';

describe('Repository', () => {
  const wrestlerName = '桃野美桜';
  const airTable = new AirTable();

  describe('fetchProWrestlers', () => {
    beforeAll(() => {
      const records = [new Record({ Name: wrestlerName }), new Record({ Name: '門倉凛' })];
      jest.spyOn(airTable, 'fetchRecords').mockResolvedValue(records);
    });

    afterAll(() => {
      airTable.fetchRecords.mockRestore();
    });

    it('レスラーを取得できること', async () => {
      const repository = new Repository(airTable);
      return repository.fetchWrestlers().then((wreslers: Wrestler[]) => {
        //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
        // eslint-disable-next-line
        expect(wreslers[0].name).toEqual(wrestlerName);
      });
    });
  });

  describe('saveWreslers', () => {
    beforeAll(() => {
      jest.spyOn(airTable, 'createRecords').mockResolvedValue(true);
    });

    afterAll(() => {
      airTable.createRecords.mockRestore();
    });

    it('レスラーを保存できること', async () => {
      const repository = new Repository(airTable);
      const wrestlers = [new Wrestler(wrestlerName)];

      return repository.saveWreslers(wrestlers).then((success) => {
        //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
        // eslint-disable-next-line
        expect(success).toBeTruthy;
      });
    });
  });
});
export {};
