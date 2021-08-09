export type PriorityType = 'default' | 'top' | 'low' | 'noDisplay';
export type PicturePrams = {
  url: string;
  names: string[];
  priority: PriorityType;
};
