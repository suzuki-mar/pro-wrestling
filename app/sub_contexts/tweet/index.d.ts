export type TTweet = {
  id: Number;
  text: string;
  photoURL?: URL;
};

export interface ITweetRepository {
  fetchPictureTweetByWrestlerNames(): Tweet[];
}
