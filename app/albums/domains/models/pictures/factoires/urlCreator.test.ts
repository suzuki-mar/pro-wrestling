import { SampleData } from 'sampleData';
import { URLCreator } from './urlCreator';

it('URLを生成できていること', () => {
  const pictureTweets = SampleData.pictureTweets();
  const creator = new URLCreator();
  const url = creator.creates(pictureTweets)[0]!;

  expect(url.defaultSizeURL).not.toBeUndefined();
  expect(url.thumbnailURL).not.toBeUndefined();
});
