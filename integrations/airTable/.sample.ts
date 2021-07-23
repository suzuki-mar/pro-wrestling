// // クライアントコード
// import * as _ from 'lodash';
// import { IWrestler } from '../../app/core/wreslter/interface';
// import { IWrestlerRepository as IBaseContextRepository } from 'app/core/wreslter/interface';
// import { IWrestlerRepository as IWrespicContextRepository } from '../../app/wrespic/interface';
// import { IAirTable, AirTableURL } from '../../integrations/interface';
// import { Record, AirTable } from '../../integrations/air_table';
// import { Wrestler } from '../../app/core/wreslter/models/wrestler';
// import * as Lib from '../../app/core/lib';

// export class WrestlerRepository implements IWrespicContextRepository, IBaseContextRepository {
//     private airTable: IAirTable;

//     constructor() {
//         this.airTable = this.buildAirtable();
//     }

//     // Mockを差し込めるようにするためにメソッドの定義をしている
//     buildAirtable(): IAirTable {
//         return new AirTable();
//     }

//     //NEW
//     fetchFavorites(): Promise<IWrestler[]> {
//         throw new Lib.NotImplementedError();
//         const wrestler = new Wrestler('hoge');
//         return new Promise((resolve, reject) => {
//             resolve([wrestler]);
//         });
//     }

//     async fetchAll(): Promise<IWrestler[]> {
//         const records = await this.airTable.fetchRecords(AirTableURL.WrestlerDebug);

//         return Promise.resolve(records)
//             .then((records) => {
//                 const wrestlers: Wrestler[] = _.flatMap(records, function (record: Record): any {
//                     return new Wrestler(record.fields['Name']);
//                 });

//                 return wrestlers;
//             })
//             .catch((res) => {
//                 throw res;
//             });
//     }

//     async save(wreslers: IWrestler[]): Promise<Boolean> {
//         const records = _.flatMap(wreslers, function (wresler) {
//             return new Record({ Name: wresler.name });
//         });

//         return await this.airTable.createRecords(AirTableURL.WrestlerDebug, records);
//     }
// }

// // テストコード
// import { Wrestler } from '../../app/core/wreslter/models/wrestler';
// import { WrestlerRepository } from './wrestler_repository';
// import { AirTable, Record } from '../../integrations/air_table';

// describe('WrestlerRepository', () => {
//     const wrestlerName = '桃野美桜';
//     const airTable = new AirTable();

//     describe('fetchProWrestlers', () => {
//         beforeAll(() => {
//             const records = [new Record({ Name: wrestlerName }), new Record({ Name: '門倉凛' })];
//             jest.spyOn(airTable, 'fetchRecords').mockResolvedValue(records);
//         });

//         afterAll(() => {
//             airTable.fetchRecords.mockRestore();
//         });

//         it('レスラーを取得できること', async () => {
//             const repository = new WrestlerRepository(airTable);
//             return repository.fetchAll().then((wreslers: Wrestler[]) => {
//                 //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
//                 // eslint-disable-next-line
//                 expect(wreslers[0].name).toEqual(wrestlerName);
//             });
//         });
//     });

//     describe('saveWreslers', () => {
//         beforeAll(() => {
//             jest.spyOn(airTable, 'createRecords').mockResolvedValue(true);
//         });

//         afterAll(() => {
//             airTable.createRecords.mockRestore();
//         });

//         it('レスラーを保存できること', async () => {
//             const repository = new WrestlerRepository(airTable);
//             const wrestlers = [new Wrestler(wrestlerName)];

//             return repository.save(wrestlers).then((success) => {
//                 //no-unused-expressionsの警告がでるが見た目上問題ないため無効にしている
//                 // eslint-disable-next-line
//                 expect(success).toBeTruthy;
//             });
//         });
//     });
// });
// export { };
