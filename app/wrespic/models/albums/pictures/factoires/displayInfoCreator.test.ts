import { SampleData } from 'sampleData';
import { DisplayInfoCreator } from './displayInfoCreator';

const creator = new DisplayInfoCreator();
const names = [SampleData.meiName(), SampleData.mioName()];
const pictureTweets = SampleData.pictureTweets();

it('DisplayInfoを作成すること', () => {
  const displayInfoList = creator.creats(names, pictureTweets);
  expect(displayInfoList.length).toEqual(SampleData.pictureTweets().length);
});

it('取得したデータの型があっていること', () => {
  const [info] = creator.creats(names, pictureTweets);
  expect(info!.date).toBeInstanceOf(Date);
  expect(info!.wrestlerNames[0]!.full).not.toBeUndefined();
});

export {};
