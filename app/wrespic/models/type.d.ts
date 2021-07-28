export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(
    names: TWrestlerName[],
    poromoters: IPromoter[]
  ): Promise<TPictureTweet[]>;
}
