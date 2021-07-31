import { SampleData } from 'sampleData';
import { DisplayInfoCreator } from './displayInfoCreator';

const creator = new DisplayInfoCreator();
const names = [SampleData.meiName(), SampleData.mioName()];
const pictureTweets = SampleData.pictureTweets();

it('DisplayInfoを作成すること', () => {
  const displayInfoList = creator.creats(names, pictureTweets);

  let expected = 0;

  SampleData.pictureTweets().forEach((tweet) => {
    expected = expected + tweet.items.length;
  });

  expect(displayInfoList.length).toEqual(expected);
});

it('取得したデータの型があっていること', () => {
  const info = creator.creats(names, pictureTweets)[0]!;
  expect(info.date).toBeInstanceOf(Date);
  expect(info.wrestlerNames[0]!.full).not.toBeUndefined();
  expect(info.contributor.number).not.toBeUndefined();
});

export {};
