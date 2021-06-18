import { IPromoter, IPromoterRepository } from 'app/core/wreslter';
import { Promoter } from 'app/core/wreslter/promoter';

export class PromoterRepository implements IPromoterRepository {
  async featchAll(): Promise<IPromoter[]> {
    return [Promoter.buildMarvelous()];
  }
}
