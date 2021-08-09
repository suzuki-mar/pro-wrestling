import { TWrestlerName } from 'app/wreslters';
import { PromoterType } from './domains/models/types/promoterType';
import { WrestlerType } from './domains/models/types/wrestlerType';

export interface IAlbumCollection {
  load(names: TWrestlerName[]): Promise<void>;
  allAlbums(): IAlbum[];
  filterAlbumsByWrestlerNames(names: TWrestlerName[]): void;
  currentSelectedAlbums(): IAlbum[];
  albumsFromKind(kind: AlbumKind): IAlbum[];
}

export const AlbumKinds = {
  Wrestler: 'wrestler',
  Promoter: 'promoter',
} as const;

export type AlbumKind = typeof AlbumKinds[keyof typeof AlbumKinds];

export interface IAlbum {
  pictures(): IPicture[];
  count(): number;
  isDisplayable(): boolean;
  title(): string;
  type(): WrestlerType | PromoterType | undefined;
}

export type TPictureNumber = {
  readonly number: Number;
  readonly str: string;
  equal(compare: TPictureNumber): boolean;
};

export type TPictureValueObject = {
  readonly number: TPictureNumber;
};

export type TPictureURL = TPictureValueObject & {
  readonly originalURL: string;
  readonly thumbnailURL: string;
  readonly defaultSizeURL: string;
  equal(compare: TPictureURL): boolean;
};

export type TPictureContributor = {
  number: number;
  identificationName: string;
  displayName: string;
};

export type TPictureDisplayInfo = TPictureValueObject & {
  readonly contributor: TPictureContributor;
  readonly date: Date;
  // DisplayInfoとWrestlerNameは別のタイミングで値をセットするため別にしたいがデータ構造の変化に時間がかかるため　一旦持たせている
  readonly wrestlerNames: TWrestlerName[];
};

export type TPictureFileName = TPictureValueObject & {
  readonly name: string;
  readonly number: TPictureNumber;
  equal(compare: TPictureFileName): boolean;
};

export type TPicturePriority = TPictureValueObject & {
  value(): number;
};

export type IPicture = {
  pictureURL(): TPictureURL;
  displayInfo(): TPictureDisplayInfo;
  fileName(): TPictureFileName;
  wrestlerNames(): TWrestlerName[];
  priority(): TPicturePriority;
  postDay(): string;
  isRelated(name: TWrestlerName): boolean;
  title(): string;
};

export type UIAction =
  | {
      type: 'selecteWrestler';
      payload: { name: TWrestlerName };
    }
  | {
      type: 'displayChoice';
    };

export type AlbumAppState = {
  albumCollection: IAlbumCollection;
};
