export type SearchResponseItem = {
  id: TTwitterID;
  text: string;
  tweeted_at: Date;
  hashtags?: string[];
  contributor: { id: number; name: string; username: string };
  photoURLs?: { id: number; url: string }[];
};
