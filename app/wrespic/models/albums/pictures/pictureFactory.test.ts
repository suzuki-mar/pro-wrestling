import { SampleData } from 'sampleData';
import { Picture } from './picture';
import { PictureFactory } from './pictureFactory';

it('Pictureを生成できること', () => {
  const pictureTweets = SampleData.pictureTweets();

  const factory = new PictureFactory();
  const pictures = factory.creates(pictureTweets, SampleData.wrestlerNames());
  expect(pictures[0]!).toBeInstanceOf(Picture);
});
