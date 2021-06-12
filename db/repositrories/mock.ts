import { IPhoto } from '../../app/wrespic/interface';

import { IPictureRepository } from '../../app/wrespic/entities/';
import { TTweet, ITweetRepository } from '../../app/sub_contexts/tweet';

export class MockIPictureRepository implements IPictureRepository {
  async regist(photo: IPhoto): Promise<IPhoto[]> {
    return [photo];
  }
}

export class MockTweetRepository implements ITweetRepository {
  fetchPictureTweetByWrestlerNames(): TTweet[] {
    const tweet: TTweet = { id: 123, text: 'hoge' };
    return [tweet];
  }
}
