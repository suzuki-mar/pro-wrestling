import { SampleData } from 'sampleData';
import { Picture } from './picture';
import { PictureFactory } from './pictureFactory';

describe('Tweetからデータを取得するだけ', () => {
  it('Pictureを生成できること', async () => {
    const pictureTweets = SampleData.pictureTweets();
    const factory = new PictureFactory();
    const pictures = await factory.creates(pictureTweets, SampleData.wrestlerNames());
    expect(pictures[0]!).toBeInstanceOf(Picture);
    expect(pictures[0]!.wrestlerNames()).not.toBeUndefined();
    expect(pictures[0]!.priority()).not.toBeUndefined();
  });
});

describe('Tweetからデータを取得してセットアップしているデータとマージするするだけ', () => {
  it('Pictureを生成できること', async () => {
    let pictureTweets = SampleData.pictureTweets();
    const factory = new PictureFactory().envaleChangingToSetupedName();
    const pictures = await factory.creates(pictureTweets, SampleData.wrestlerNames());
    expect(pictures[0]!).toBeInstanceOf(Picture);

    // すべてセットアップしているわけではない
    const exists = pictures.find((picture) => {
      return picture.wrestlerNames() !== undefined;
    });

    expect(exists).toBeTruthy();
  });
});
