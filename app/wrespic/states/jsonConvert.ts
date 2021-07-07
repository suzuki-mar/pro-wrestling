import { IWrestlerName } from 'app/core/wreslter';
import { WrestlerName } from 'app/core/wreslter/wrestlerName';
import { SelectedWrestlers } from '../domain/selectedWrestlers';
import { FavoriteWrestlers } from '../domain/favoriteWrestlers';
import { IFavoriteWrestlers, ISelectedWrestlers, TSource } from '..';
import { Wrestler } from 'app/core/wreslter/wrestler';

export class JSONConvert {
  static toWreslerName(params: {}): IWrestlerName {
    return new WrestlerName(params['full']);
  }

  static toSelectedWresler(params: {}): ISelectedWrestlers {
    const selectedWrestlers = new SelectedWrestlers();

    params['_names'].forEach((nameStr: string) => {
      const name = this.toWreslerName(nameStr);
      selectedWrestlers.selectWreslerName(name);
    });

    return selectedWrestlers;
  }

  static toFavoriteWreslers(paramsList: {}): IFavoriteWrestlers {
    const wrestlers = paramsList['_wrestlers'].map((param) => {
      const name = this.toWreslerName(param['name']);
      return new Wrestler(name);
    });

    return FavoriteWrestlers.build(wrestlers);
  }

  static toSources(paramsList: any[]): TSource[] {
    return paramsList.map((params) => {
      return {
        urlStr: params['urlStr'],
        name: this.toWreslerName(params['name']),
        date: new Date(params['date']),
      };
    });
  }
}
