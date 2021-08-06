import { BlitzApiRequest, BlitzApiResponse } from '@blitzjs/core';
import _ from 'lodash';
import { TweetURLList } from 'sampleData/tweetURLList';

export function execute(): string[] {
  const urls = createTwitterURLs();

  const ids = urls.map((url) => {
    return _.last(url.split('/'));
  });

  return ids as string[];
}

function createTwitterURLs(): string[] {
  let urls: string[] = [];
  urls = urls.concat(TweetURLList.takumi());
  urls = urls.concat(TweetURLList.mio());
  urls = urls.concat(TweetURLList.rin());
  urls = urls.concat(TweetURLList.mikoto());
  urls = urls.concat(TweetURLList.mei());
  urls = urls.concat(TweetURLList.maria());
  urls = urls.concat(TweetURLList.ai());
  urls = urls.filter((url) => !_.isEmpty(url));

  return _.uniq(urls);
}

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  const ids = execute();
  res.end(JSON.stringify(ids));
};
export default handler;
