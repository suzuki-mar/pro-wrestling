import { Promoter } from 'app/wreslters/domains/models/promoter';
import { WrestlerName } from 'app/wreslters/domains/models/wrestlerName';
import { SampleData } from 'sampleData';
import { IContest } from 'app/contests';
import { Contest } from 'app/contests/domain/models/contest';
import * as _ from 'loadsh';
import { IPromoter, TWrestlerName } from 'app/wreslters';
import { ContestParams, WrestlerFirstNames } from './contstDatas/type.d';
import { ContestParamsList } from './contstDatas/contetsParamsList';

export class ContestData {
  // DBを使うまでは固定値を使用する
  static creates(): IContest[] {
    const result = this.createsForMarvelous().concat(this.createsOtherPromoterContest());
    return result;
  }

  private static wrestlerNames(): {} {
    let names = {};

    names[WrestlerFirstNames.TAKUMI] = new WrestlerName('彩羽匠', true);
    names[WrestlerFirstNames.MIO] = SampleData.mioName();
    names[WrestlerFirstNames.RIN] = new WrestlerName('門倉凛', true);
    names[WrestlerFirstNames.MIKOTO] = new WrestlerName('神童ミコト', true);
    names[WrestlerFirstNames.MEI] = SampleData.meiName();
    names[WrestlerFirstNames.MARIA] = SampleData.mariaName();
    names[WrestlerFirstNames.AI] = new WrestlerName('宝山愛', true);

    return names;
  }

  private static createsForMarvelous(): IContest[] {
    const paramLists: ContestParams[] = ContestParamsList.marvelous();
    let contests: IContest[] = [];

    paramLists.forEach((params) => {
      const names = _.filter(this.wrestlerNames(), (_, key) => {
        return !params.firstNames.some((p) => {
          return p === key;
        });
      });

      contests = [...contests, this.buildPromoterContest(params, names, Promoter.buildMarvelous())];
    });

    return contests;
  }

  private static createsOtherPromoterContest(): IContest[] {
    const otherParamsLists: ContestParams[] = ContestParamsList.otherPromoters();

    let contests: IContest[] = [];

    otherParamsLists.forEach((params) => {
      const names = _.filter(this.wrestlerNames(), (_, key) => {
        return params.firstNames.some((p) => {
          return p === key;
        });
      });

      contests = [
        ...contests,
        this.buildPromoterContest(params, names, Promoter.buildOtherPromoter()),
      ];
    });

    return contests;
  }

  private static buildPromoterContest(
    params: ContestParams,
    names: TWrestlerName[],
    promoter: IPromoter
  ): IContest {
    const dayParts = params.day.split('.');
    const dateStr = `${dayParts[2]}-${dayParts[1]}-${dayParts[0]}`;
    const date = new Date(dateStr);

    const title = params.title.replace(promoter.name.shortName, '').trim();
    return new Contest(date, title, promoter, names);
  }
}
