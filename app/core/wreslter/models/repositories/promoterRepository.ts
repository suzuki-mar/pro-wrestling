import { IPromoter, TWrestlerName } from 'app/core/wreslter';
import { IPromoterRepository } from 'app/core/wreslter/models/type';
import { Promoter } from 'app/core/wreslter/models/promoter';

export class PromoterRepository implements IPromoterRepository {
  async featchAll(): Promise<IPromoter[]> {
    return [Promoter.buildMarvelous()];
  }

  async featchByWrestlerName(name: TWrestlerName): Promise<IPromoter> {
    return Promoter.buildMarvelous();
  }
}
