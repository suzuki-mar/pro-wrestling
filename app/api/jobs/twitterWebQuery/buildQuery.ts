import { BlitzApiRequest, BlitzApiResponse } from '@blitzjs/core';
import { TWrestlerName } from 'app/core/wreslter';
import { PromoterRepository } from 'app/core/wreslter/models/repositories/promoterRepository';
import { WreslerQuery } from 'app/core/wreslter/models/wreslterQuery';
import moment from 'moment';
import * as _ from 'loadsh';
import { ContestData } from 'sampleData/contestData';

export async function execute(): Promise<{}> {
  let promises: Promise<string[]>[] = [];

  const wreslerQuery = new WreslerQuery();
  const names = wreslerQuery.findNames();
  const date = moment();
  date.subtract(1, 'months').subtract(15, 'days');

  promises = promises.concat(buildQueries(names, date));

  ContestData.creates().forEach((contest) => {
    const since = moment(contest.date());
    const until = moment(contest.date()).add(3, 'days');

    promises = promises.concat(buildQueries(contest.participants(), since, until));
  });

  let queries: string[] = [];

  await Promise.all(promises).then((values: string[][]) => {
    queries = queries.concat(values.flat());
  });

  let groupedQueries = {};
  names.forEach((name) => {
    groupedQueries[name.full] = [];
  });

  queries.forEach((query) => {
    const grouped = _.find(groupedQueries, (qs, key) => {
      return query.includes(key);
    });

    grouped.push(query);
  });

  return groupedQueries;
}

async function buildQueries(
  names: TWrestlerName[],
  since: moment.Moment,
  until?: moment.Moment
): Promise<string[]> {
  const sinceStr = since.format('YYYY-MM-DD');

  const query = new PromoterRepository();
  const promoters = await query.featchAll();

  return names.map((name) => {
    let keyword: string;

    if (name.unique) {
      keyword = `#${name.full}`;
    } else {
      const promoter = promoters.find((p) => {
        return p.isBelongTo(name);
      });
      keyword = `#${name.full} #${promoter!.hashtag}`;
    }

    let query = `(${keyword}) since:${sinceStr}`;
    if (until !== undefined) {
      const untilStr = until.format('YYYY-MM-DD');
      query += ` until:${untilStr}`;
    }

    return query;
  });
}

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  const groupedQueries = await execute();
  res.end(JSON.stringify(groupedQueries));
};
export default handler;
