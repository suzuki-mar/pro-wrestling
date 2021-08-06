import { Promoter } from 'app/core/wreslter/models/promoter';
import { WrestlerName } from 'app/core/wreslter/models/wrestlerName';
import { SampleData } from 'sampleData';
import { IContest } from 'app/contests';
import { Contest } from 'app/contests/domain/models/contest';
import * as _ from 'loadsh';
import { IPromoter, TWrestlerName } from 'app/core/wreslter';

const WrestlerFirstNames = {
  TAKUMI: 'takumi',
  MIO: 'mio',
  RIN: 'rin',
  MIKOTO: 'mikoto',
  MEI: 'mei',
  MARIA: 'maria',
  AI: 'ai',
} as const;

type WrestlerFirstName = typeof WrestlerFirstNames[keyof typeof WrestlerFirstNames];

type ContestParams = {
  day: string;
  title: string;
  firstNames: WrestlerFirstName[];
};

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
    const paramLists: ContestParams[] = [
      {
        day: '13.06.2021',
        title: 'GAEAISM',
        firstNames: [WrestlerFirstNames.AI, WrestlerFirstNames.TAKUMI],
      },
      { day: '19.07.2021', title: '5th Anniversary', firstNames: [WrestlerFirstNames.MARIA] },
      {
        day: '30.03.2021',
        title: 'Marvelous One Month To GAEAISM',
        firstNames: [WrestlerFirstNames.MARIA, WrestlerFirstNames.TAKUMI],
      },
    ];

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
    const waveNames = [WrestlerFirstNames.MIO, WrestlerFirstNames.RIN];

    const otherParamsLists: ContestParams[] = [
      {
        day: '27.06.2021',
        title: '仙女 新潟市体育館大会',
        firstNames: [WrestlerFirstNames.MIO, WrestlerFirstNames.RIN, WrestlerFirstNames.MEI],
      },
      {
        day: '11.07.2021',
        title: '仙女 後楽園ホール大会',
        firstNames: [WrestlerFirstNames.MIO],
      },
      {
        day: '01.07.2021',
        title: 'Pro Wrestling WAVE	WAVE Catch The Wave 2021 Final',
        firstNames: waveNames,
      },
      {
        day: '29.06.2021',
        title: 'WAVE Catch The Wave 2021 - Tag 5',
        firstNames: waveNames,
      },
      {
        day: '22.06.2021',
        title: 'WAVE Catch The Wave 2021 - Tag 4',
        firstNames: waveNames,
      },
      {
        day: '14.06.2021',
        title: 'WAVE Catch The Wave 2021 - Tag 3',
        firstNames: waveNames,
      },
      {
        day: '08.06.2021',
        title: 'WAVE Catch The Wave 2021 - Tag 2',
        firstNames: waveNames,
      },
    ];

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
