import { IPromoter, TWrestlerName } from 'app/wreslters';
import { IPromoterRepository } from 'app/wreslters/domains/type';
import { Promoter } from 'app/wreslters/domains/models/promoter';

export class PromoterRepository implements IPromoterRepository {
  async featchAll(): Promise<IPromoter[]> {
    return [Promoter.buildMarvelous()];
  }

  async featchByWrestlerName(name: TWrestlerName): Promise<IPromoter> {
    return Promoter.buildMarvelous();
  }
}
