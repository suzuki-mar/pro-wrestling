import { FavoriteWrestlers } from 'app/wrespic/entities/favoriteWrestlers';
import { IWrestler } from 'app/core/wreslter';

export class VFavoriteWrestlers extends FavoriteWrestlers {
  // react-queryを使うときにJSONになってしまうため
  setUpWrestlers(wrestlers: IWrestler[]) {
    this._wrestlers = wrestlers;
  }
}
