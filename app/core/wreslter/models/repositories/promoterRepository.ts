import { IPromoter } from 'app/core/wreslter';
import { IPromoterRepository } from 'app/core/wreslter/models/type';
import { Promoter } from 'app/core/wreslter/models/promoter';

export class PromoterRepository implements IPromoterRepository {
  async featchAll(): Promise<IPromoter[]> {
    return [Promoter.buildMarvelous()];
  }
}
