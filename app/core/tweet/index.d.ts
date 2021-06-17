export type TTextOnlyTweet = {
  id: Number;
  text: string;
};

type TPictureTweet = TTextOnlyTweet & { photoURL: URL };
type TTweet = TPictureTweet | TTextOnlyTweet;

export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(): Promise<TTPictureTweet[]>;
}
