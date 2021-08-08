import { WrestlerFirstNames, ContestParams } from './type';

export class ContestParamsList {
  static marvelous(): ContestParams[] {
    return [
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
  }

  static otherPromoters(): ContestParams[] {
    const waveCatchNames = [WrestlerFirstNames.MIO, WrestlerFirstNames.RIN];

    return [
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
        firstNames: waveCatchNames,
      },
      {
        day: '29.06.2021',
        title: 'WAVE Catch The Wave 2021 - Tag 5',
        firstNames: waveCatchNames,
      },
      {
        day: '22.06.2021',
        title: 'WAVE Catch The Wave 2021 - Tag 4',
        firstNames: waveCatchNames,
      },
      {
        day: '14.06.2021',
        title: 'WAVE Catch The Wave 2021 - Tag 3',
        firstNames: waveCatchNames,
      },
      {
        day: '08.06.2021',
        title: 'WAVE Catch The Wave 2021 - Tag 2',
        firstNames: waveCatchNames,
      },
    ];
  }
}
