import { IPromoter, TWrestlerName } from 'app/core/wreslter';

export interface IContest {
  date(): Date;
  title(): string;
  promoter(): IPromoter;
  participants(): TWrestlerName[];
}
