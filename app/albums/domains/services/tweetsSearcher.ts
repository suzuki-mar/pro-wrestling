import { TWrestlerName } from 'app/wreslters';
import { RepositoryFactory } from 'infrastructure/repositoryFactory';
import { TPictureTweet } from 'integrations/twitter';

export class TweetSearcher {
  async search(names: TWrestlerName[]): Promise<TPictureTweet[]> {
    const tweetRepository = RepositoryFactory.factoryTweetRepository();
    const promotRepository = RepositoryFactory.factoryPromoterRepository();
    const promots = await promotRepository.featchAll();

    const twitterIds = tweetRepository.fetchDefaultLoadingIDs();

    const promises = [
      tweetRepository.fetchPictureTweetByWrestlerNames(names, promots),
      tweetRepository.fetchPictureTweetsByIds(twitterIds),
    ];

    const result = await Promise.all(promises).then((values) => {
      return values.flat();
    });

    return result;
  }
}
