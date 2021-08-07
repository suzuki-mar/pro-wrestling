import { IPromoter, TWrestlerName } from 'app/wreslters';

export interface IContest {
  date(): Date;
  title(): string;
  promoter(): IPromoter;
  participants(): TWrestlerName[];
}
