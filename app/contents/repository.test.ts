import { Record, AirTable } from '../../integrations/air_table';
import { Repository } from './repository';
import { SourceId } from './source';

describe('Repository', () => {
  const airTable = new AirTable();

  describe.skip('未実装なため一旦Skip excludeSavedSourceIds', () => {
    beforeAll(() => {
      const records = [new Record({ SourceNumber: '1' }), new Record({ SourceNumber: '3' })];
      jest.spyOn(airTable, 'fetchRecords').mockResolvedValue(records);
    });

    afterAll(() => {
      airTable.fetchRecords.mockRestore();
    });

    it('すでに保存しているIDを除外すること', async () => {
      const repository = new Repository(airTable);
      const sourceIds = [new SourceId('1'), new SourceId('2')];
      return repository.excludeSavedSourceIds(sourceIds).then((ids: SourceId[]) => {
        //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
        // eslint-disable-next-line
        expect(ids[0]).toEqual('2');
      });
    });
  });
});
export {};
