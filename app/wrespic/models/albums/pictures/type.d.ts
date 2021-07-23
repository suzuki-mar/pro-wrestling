export type TPictureNumber = {
  readonly number: Number;
  readonly str: string;
  equal(compare: TPictureNumber): boolean;
};

export type TPictureValueObject = {
  readonly number: TPictureNumber;
};
